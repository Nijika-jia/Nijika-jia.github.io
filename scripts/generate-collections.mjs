import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

for (const collection of collections) {
  const key = String(collection.key ?? '').trim()
  if (!/^[a-z0-9][a-z0-9-]*$/.test(key))
    throw new Error(`Invalid collection key: ${key || '(empty)'}`)
  if (keys.has(key))
    throw new Error(`Duplicate collection key: ${key}`)
  keys.add(key)

  const items = Array.isArray(collection.items) ? collection.items : []
  const itemKeys = new Set()

  for (const item of items) {
    const itemKey = item.key == null ? '' : String(item.key).trim()
    const link = item.link == null ? '' : String(item.link).trim()

    if (itemKey && link)
      throw new Error(`Collection "${key}" item cannot define both key and link`)
    if (!itemKey && !link)
      throw new Error(`Collection "${key}" item must define key or link`)
    if (itemKey && itemKeys.has(itemKey))
      throw new Error(`Collection "${key}" has duplicate item key: ${itemKey}`)
    if (itemKey)
      itemKeys.add(itemKey)
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
