export interface ThemeConfig {
  /** 首页卷宗上方的短标签 */
  eyebrow: string
  /** 首页副标题 */
  motto: string
  /** 页脚补充文字 */
  footer: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
