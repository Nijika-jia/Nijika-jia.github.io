import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputFile = path.join(root, 'data', 'site-stats.json')
const siteUrl = process.env.SITE_URL || 'https://nijika-jia.github.io/'

const response = await fetch(
  `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=nijika_site_stats&_=${Date.now()}`,
  {
    headers: {
      'referer': siteUrl,
      'origin': new URL(siteUrl).origin,
      'user-agent': 'Mozilla/5.0 (compatible; NijikajiaSiteStats/1.0)',
    },
    signal: AbortSignal.timeout(15000),
  },
)

if (!response.ok)
  throw new Error(`Busuanzi request failed: ${response.status}`)

const body = await response.text()
const match = body.match(/\((\{[\s\S]*\})\)/)
if (!match)
  throw new Error('Busuanzi response did not contain JSON data.')

const stats = JSON.parse(match[1])

const output = {
  site_pv: Number(stats.site_pv ?? 0),
  site_uv: Number(stats.site_uv ?? 0),
  updated_at: new Date().toISOString(),
}

await fs.writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`)
console.log(`[stats] ${output.site_pv} views, ${output.site_uv} visitors`)
