import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// The live2d addon only supports texture switching through the GitHub API when
// `models` is a string, which is rate-limited (HTTP 403). With `models` as an
// array, every entry is treated as a separate skin. This script expands the
// local texture lists into one model JSON per skin, so the site keeps the full
// wardrobe without calling the GitHub API at runtime.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = path.join(root, 'data', 'live2d')
const outputDir = path.join(root, 'public', 'live2d')
const cdnBase = 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker'
const characters = ['Tia', 'Pio']

const absolute = (base, file) => file.startsWith('http') ? file : `${base}/${file}`

for (const name of characters) {
  const model = JSON.parse(await fs.readFile(path.join(dataDir, `${name}.json`), 'utf8'))
  const skins = JSON.parse(await fs.readFile(path.join(dataDir, `${name}.textures.json`), 'utf8'))
  const base = `${cdnBase}/${name}`
  const characterDir = path.join(outputDir, name)

  await fs.rm(characterDir, { recursive: true, force: true })
  await fs.mkdir(characterDir, { recursive: true })

  for (const skin of skins) {
    const definition = structuredClone(model)
    definition.model = absolute(base, definition.model)
    definition.textures = [`textures/${skin}`].map(file => absolute(base, file))

    for (const motions of Object.values(definition.motions ?? {})) {
      if (!Array.isArray(motions))
        continue
      for (const motion of motions) {
        if (motion.file)
          motion.file = absolute(base, motion.file)
        if (motion.sound)
          motion.sound = absolute(base, motion.sound)
      }
    }

    const file = path.join(characterDir, skin.replace(/\.png$/i, '.json'))
    await fs.writeFile(file, `${JSON.stringify(definition, null, 2)}\n`)
  }

  console.log(`${name}: generated ${skins.length} skins`)
}
