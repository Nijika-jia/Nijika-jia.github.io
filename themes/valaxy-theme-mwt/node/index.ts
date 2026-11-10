import type { ThemeConfig } from '../types'

export const defaultThemeConfig: ThemeConfig = {
  eyebrow: 'TRIAL ARCHIVE / 魔女审判',
  motto: '记录每一次判决之前的证词。',
  footer: '非官方主题 · 与游戏开发商无关',
}

export function generateSafelist() {
  return [] as string[]
}
