import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputFile = path.join(root, 'data', 'site-stats.json')
const siteUrl = process.env.SITE_URL || 'https://nijika-jia.github.io/'
const startedAt = new Date('2025-01-20T00:00:00+08:00')

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
const elapsed = Math.max(0, Date.now() - startedAt.getTime())
const uptimeDays = Math.floor(elapsed / 86_400_000)
const uptimeHours = Math.floor((elapsed % 86_400_000) / 3_600_000)
const uptimeMinutes = Math.floor((elapsed % 3_600_000) / 60_000)

const output = {
  site_pv: Number(stats.site_pv ?? 0),
  site_uv: Number(stats.site_uv ?? 0),
  uptime_days: uptimeDays,
  uptime_hours: uptimeHours,
  uptime_minutes: uptimeMinutes,
  updated_at: new Date().toISOString(),
}

await fs.writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`)
console.log(`[stats] ${output.site_pv} views, ${output.site_uv} visitors`)
