import type { ThemeConfig } from './types'
import { defineTheme } from 'valaxy'
import { defaultThemeConfig } from './node'

export default defineTheme<ThemeConfig>(() => {
  return {
    themeConfig: defaultThemeConfig,
  }
})
