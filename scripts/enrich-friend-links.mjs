import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseDocument } from 'htmlparser2'
import YAML from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const linksFile = process.env.FRIEND_LINKS_FILE
  ? path.resolve(process.env.FRIEND_LINKS_FILE)
  : path.join(root, 'public', 'friends', 'links.json')
const linksPageFile = process.env.FRIEND_LINKS_PAGE
  ? path.resolve(process.env.FRIEND_LINKS_PAGE)
  : path.join(root, 'pages', 'links', 'index.md')

const links = JSON.parse(await fs.readFile(linksFile, 'utf8'))
if (!Array.isArray(links))
  throw new Error('Friend links must be a JSON array.')

const normalizeText = (value, maxLength = 180) => String(value ?? '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, maxLength)

const isPrivateHost = (hostname) => {
  const host = hostname.toLowerCase()
  if (host === 'localhost' || host === '::1' || host.endsWith('.local'))
    return true
  if (/^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host))
    return true
  const match = host.match(/^172\.(\d+)\./)
  return Boolean(match && Number(match[1]) >= 16 && Number(match[1]) <= 31)
}

const findElements = (node, tagName) => {
  const result = []
  const visit = (current) => {
    if (current.type === 'tag' && current.name === tagName)
      result.push(current)
    for (const child of current.children ?? [])
      visit(child)
  }
  visit(node)
  return result
}

const getText = (node) => {
  if (node.type === 'text')
    return node.data ?? ''
  return (node.children ?? []).map(getText).join('')
}

const findMeta = (document, attribute, value) => {
  const meta = findElements(document, 'meta').find(node => node.attribs?.[attribute]?.toLowerCase() === value)
  return meta?.attribs?.content ?? ''
}

const fetchMetadata = async (url) => {
  const parsed = new URL(url)
  if (!['http:', 'https:'].includes(parsed.protocol) || isPrivateHost(parsed.hostname))
    return null

  const response = await fetch(parsed, {
    redirect: 'follow',
    headers: {
      'accept': 'text/html,application/xhtml+xml',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'user-agent': 'Mozilla/5.0 (compatible; NijikajiaFriendLinks/1.0)',
    },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok)
    return null

  const document = parseDocument(await response.text(), { decodeEntities: true })
  const title = getText(findElements(document, 'title')[0] ?? { type: 'text', data: '' })
  const siteName = findMeta(document, 'property', 'og:site_name')
  const ogTitle = findMeta(document, 'property', 'og:title')
  const description = findMeta(document, 'name', 'description')
    || findMeta(document, 'property', 'og:description')
    || findMeta(document, 'name', 'twitter:description')

  return {
    blog: normalizeText(siteName || ogTitle || title || parsed.hostname, 80),
    desc: normalizeText(description, 160),
  }
}

const mapWithConcurrency = async (items, limit, callback) => {
  const results = new Array(items.length)
  let nextIndex = 0

  const worker = async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++
      results[index] = await callback(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

let enriched = 0
await mapWithConcurrency(links, 4, async (link) => {
  const url = String(link.url ?? '').trim()
  let hostname = ''

  try {
    const parsed = new URL(url)
    if (['http:', 'https:'].includes(parsed.protocol))
      hostname = parsed.hostname
  }
  catch {}

  if (!link.color)
    link.color = 'auto'

  if (!hostname || (link.blog && link.desc))
    return

  try {
    const metadata = await fetchMetadata(url)
    if (!metadata)
      return

    let changed = false
    if (!link.blog && metadata.blog) {
      link.blog = metadata.blog
      changed = true
    }
    if (!link.desc && metadata.desc) {
      link.desc = metadata.desc
      changed = true
    }
    if (changed)
      enriched++
  }
  catch (error) {
    console.warn(`[friends] ${hostname}: ${error.message}`)
  }
  finally {
    if (!link.blog)
      link.blog = hostname
    if (!link.desc)
      link.desc = `来自 ${hostname} 的友链`
  }
})

for (const link of links) {
  if (!link.name && link.blog)
    link.name = link.blog
}

const output = `${JSON.stringify(links, null, 2)}\n`
const current = await fs.readFile(linksFile, 'utf8')
if (current !== output)
  await fs.writeFile(linksFile, output)

const page = await fs.readFile(linksPageFile, 'utf8')
const frontmatter = page.match(/^---\r?\n([\s\S]*?)\r?\n---/)
if (!frontmatter)
  throw new Error(`Missing frontmatter in ${linksPageFile}`)

const document = YAML.parseDocument(frontmatter[1])
const stableHash = value => {
  let hash = 0
  for (const char of String(value ?? ''))
    hash = ((hash << 5) - hash + char.codePointAt(0)) | 0
  return Math.abs(hash)
}
const pageLinks = [...links].sort((a, b) => stableHash(a.url) - stableHash(b.url))
document.set('links', pageLinks)
const nextPage = `---\n${document.toString().trimEnd()}\n---${page.slice(frontmatter[0].length)}`
if (nextPage !== page)
  await fs.writeFile(linksPageFile, nextPage)

console.log(`[friends] enriched ${enriched} link(s)`)
