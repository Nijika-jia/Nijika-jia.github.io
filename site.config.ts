import { $t, defineSiteConfig } from 'valaxy'
import siteData from './data/site.json'

export default defineSiteConfig({
  url: siteData.url,
  lang: siteData.lang,
  languages: siteData.languages,
  title: $t('site.title'),
  description: $t('site.description'),
  subtitle: siteData.subtitle,
  author: siteData.author,
  favicon: siteData.favicon,
  encrypt: siteData.encrypt,
  frontmatter: siteData.frontmatter,
  statistics: siteData.statistics,
  search: {
    enable: siteData.search.enable,
    provider: siteData.search.provider as 'algolia' | 'engine' | 'fuse' | 'local',
  },
  fuse: {
    dataPath: 'valaxy-fuse-list.json',
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content', 'link', 'author'],
    },
  },
  comment: siteData.comment,
  timezone: siteData.timezone,
  lastUpdated: siteData.lastUpdated,
  orderBy: siteData.orderBy as 'date' | 'updated',
  excerpt: siteData.excerpt,
  social: siteData.social,
  sponsor: siteData.sponsor,
  pageSize: siteData.pageSize,
  mediumZoom: siteData.mediumZoom,
  vanillaLazyload: siteData.vanillaLazyload,
  codeHeightLimit: siteData.codeHeightLimit,
})
