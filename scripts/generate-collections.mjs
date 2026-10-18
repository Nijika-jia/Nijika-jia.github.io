import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import YAML from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataFile = process.env.COLLECTIONS_DATA_FILE
  ? path.resolve(process.env.COLLECTIONS_DATA_FILE)
  : path.join(root, 'data', 'collections.json')
const collectionsRoot = process.env.COLLECTIONS_OUTPUT_DIR
  ? path.resolve(process.env.COLLECTIONS_OUTPUT_DIR)
  : path.join(root, 'pages', 'collections')
const overviewFile = path.join(collectionsRoot, 'index.md')

const data = JSON.parse(await fs.readFile(dataFile, 'utf8'))
const collections = Array.isArray(data.collections) ? data.collections : []
const overview = data.overview ?? {}
const overviewTitle = overview.title ?? {}
const overviewIcon = overview.icon || 'i-ri-gallery-view'
const keys = new Set()

const yamlString = value => JSON.stringify(String(value ?? ''))
const yamlList = values => values.length
  ? values.map(value => `  - ${yamlString(value)}`).join('\n')
  : '  []'

async function exists(file) {
  try {
    await fs.access(file)
    return true
  }
  catch {
    return false
  }
}

async function writeIfChanged(file, content) {
  if (await exists(file)) {
    const current = await fs.readFile(file, 'utf8')
    if (current === content)
      return
  }
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content)
}

function normalizeRepoPath(value) {
  return String(value ?? '').trim().replace(/\\/g, '/').replace(/^\.?\//, '')
}

function referencePaths(value) {
  if (Array.isArray(value))
    return value.map(normalizeRepoPath).filter(Boolean)
  const normalized = normalizeRepoPath(value)
  return normalized ? [normalized] : []
}

async function readMarkdownTitle(file, fallback) {
  const content = await fs.readFile(file, 'utf8')
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter)
    return fallback

  try {
    const data = YAML.parse(frontmatter[1]) ?? {}
    const title = data.title
    if (typeof title === 'string' && title.trim())
      return title.trim()
    if (title && typeof title === 'object') {
      const localized = title['zh-CN'] ?? title.zh ?? title.en
      if (typeof localized === 'string' && localized.trim())
        return localized.trim()
    }
  }
  catch {
    // A malformed title should not stop the whole collection from being generated.
  }

  return fallback
}

function markdownLink(file) {
  const route = `/${file.replace(/^pages\//, '').replace(/\.md$/i, '').replace(/\/index$/, '')}`
  return encodeURI(route || '/')
}

async function resolveReferencedItems(collection, collectionKey) {
  const blogPosts = referencePaths(collection.posts)
  const collectionArticles = referencePaths(collection.collectionArticles)
  const items = []

  for (const file of blogPosts) {
    if (!file.startsWith('pages/posts/'))
      throw new Error(`Collection "${collectionKey}" post must be under pages/posts: ${file}`)
    if (!await exists(file))
      throw new Error(`Collection "${collectionKey}" post does not exist: ${file}`)

    const fallback = path.basename(file, path.extname(file))
    items.push({
      title: await readMarkdownTitle(file, fallback),
      link: markdownLink(file),
    })
  }

  const collectionPrefix = `pages/collections/${collectionKey}/`
  for (const file of collectionArticles) {
    if (!file.startsWith(collectionPrefix) || file === `${collectionPrefix}index.md`)
      throw new Error(`Collection "${collectionKey}" article must be under ${collectionPrefix}: ${file}`)
    if (!await exists(file))
      throw new Error(`Collection "${collectionKey}" article does not exist: ${file}`)

    const key = path.basename(file, path.extname(file))
    items.push({
      title: await readMarkdownTitle(file, key),
      key,
    })
  }

  return items
}

for (const collection of collections) {
  const key = String(collection.key ?? '').trim()
  if (!/^[a-z0-9][a-z0-9-]*$/.test(key))
    throw new Error(`Invalid collection key: ${key || '(empty)'}`)
  if (keys.has(key))
    throw new Error(`Duplicate collection key: ${key}`)
  keys.add(key)

  const legacyItems = Array.isArray(collection.items) ? collection.items : []
  const referencedItems = await resolveReferencedItems(collection, key)
  const items = [...referencedItems, ...legacyItems]
  const itemKeys = new Set()
  const itemLinks = new Set()

  for (const item of items) {
    const itemKey = item.key == null ? '' : String(item.key).trim()
    const link = item.link == null ? '' : String(item.link).trim()

    if (itemKey && link)
      throw new Error(`Collection "${key}" item cannot define both key and link`)
    if (!itemKey && !link)
      throw new Error(`Collection "${key}" item must define key or link`)
    if (itemKey && itemKeys.has(itemKey))
      throw new Error(`Collection "${key}" has duplicate item key: ${itemKey}`)
    if (link && itemLinks.has(link))
      throw new Error(`Collection "${key}" has duplicate item link: ${link}`)
    if (itemKey)
      itemKeys.add(itemKey)
    if (link)
      itemLinks.add(link)
  }

  const collectionDir = path.join(collectionsRoot, key)
  await fs.mkdir(collectionDir, { recursive: true })

  const normalizedConfig = {
    key,
    title: collection.title ?? key,
    cover: collection.cover ?? '',
    description: collection.description ?? '',
    categories: Array.isArray(collection.categories) ? collection.categories : [],
    tags: Array.isArray(collection.tags) ? collection.tags : [],
    collapse: collection.collapse !== false,
    items: items.map(item => ({
      title: item.title ?? item.key ?? item.link ?? '',
      ...(item.key != null ? { key: String(item.key) } : { link: String(item.link) }),
    })),
  }

  const indexTs = `// Generated from data/collections.json. Do not edit manually.
import { defineCollection } from 'valaxy'

export default defineCollection(${JSON.stringify(normalizedConfig, null, 2)})
`
  await writeIfChanged(path.join(collectionDir, 'index.ts'), indexTs)

  const indexMdFile = path.join(collectionDir, 'index.md')
  if (!await exists(indexMdFile)) {
    const title = yamlString(normalizedConfig.title)
    const cover = normalizedConfig.cover ? `\ncover: ${yamlString(normalizedConfig.cover)}` : ''
    await writeIfChanged(indexMdFile, `---\nlayout: collection\ntitle: ${title}${cover}\n---\n`)
  }

  for (const item of normalizedConfig.items) {
    if (!item.key)
      continue
    const articleFile = path.join(collectionDir, `${item.key}.md`)
    if (!await exists(articleFile))
      await writeIfChanged(articleFile, `---\ntitle: ${yamlString(item.title)}\n---\n`)
  }
}

const overviewContent = `---
title:
  zh-CN: ${yamlString(overviewTitle['zh-CN'] ?? '合集')}
  en: ${yamlString(overviewTitle.en ?? 'Collections')}
layout: collections
icon: ${yamlString(overviewIcon)}
collections:
${yamlList([...keys])}
---
`

await writeIfChanged(overviewFile, overviewContent)
