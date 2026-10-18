import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig, $t } from 'valaxy'
import { addonLightGallery } from 'valaxy-addon-lightgallery'
import { addonWaline } from "valaxy-addon-waline";
import { addonLive2d } from 'valaxy-addon-live2d'
import { addonMeting } from 'valaxy-addon-meting'
import { addonComponents } from 'valaxy-addon-components'
import { addonHitokoto, HitokotoType } from 'valaxy-addon-hitokoto';
import { addonBangumi } from 'valaxy-addon-bangumi';
import themeData from './data/theme.json'
// add icons what you will need
const safelist = [
  'i-ri-home-line',
  'i-ri-archive-line',
  'i-ri-folder-line',
  'i-ri-price-tag-3-line',
  'i-ri-links-line',
  'i-ri-gallery-line',
  'i-ri-gallery-view',
  'i-ri-puzzle-fill',
  'i-ri-user-line',
  'i-ri-heart-2-fill',
  'i-ri-article-line',
  // 主题组件响应式断点类（UnoCSS 未扫描 node_modules 时需要手动添加）
  'lg:hidden',
  'lg:contents',
  'lg:inline-flex',
  'lg:flex-col',
  'md:hidden',
  'md:inline-flex',
  'sm:inline-flex',
  'hidden',
]
/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',
  build: {
    ssgForPagination: true,
  },
  themeConfig: {
    banner: themeData.banner,
    outlineTitle: themeData.outlineTitle,
    nav: themeData.nav,
    bg_image: themeData.bg_image,
    pages: themeData.pages.map(({ nameKey, ...page }) => ({
      ...page,
      name: $t(nameKey),
    })),
    types: Object.fromEntries(
      themeData.types.map(({ id, ...type }) => [id, type]),
    ),
    footer: themeData.footer,
    notice: themeData.notice,
    say: themeData.say,
    colors: themeData.colors,
    fireworks: themeData.fireworks,
  },
  markdown: {
    theme:{
      light : 'material-theme-lighter',
      dark : 'material-theme-darker'
    }
  },
  addons: [
    addonLightGallery(),
    addonBangumi({
      api: 'https://nijikajia--b31b13a06a5711f1944e1607ee4eb77e.web.val.run',  // 替换成你自己部署的后端
      bgmEnabled: true,
      pageSize: 30,
      bilibiliEnabled:false,
    }),
    addonWaline({
      serverURL: "https://waline-ler6ydvqd-xsj20040824-2164s-projects.vercel.app/",		// Waline服务链接
      locale: {
        placeholder: "填写qq邮箱或点击登录，可以展示个人头像",
      },
      comment: true,
      pageview: '#waline-pageview-count',
      search : true,
      reaction : [

      ]
    }),
    addonLive2d({
      global: true,
      enableLive2D: ['Tia', 'Pio'],
      widthLimit: 290,
      live2DCollection: {
        Tia: {
          message: '来自 Potion Maker 的 Tia 酱 ~',
          models: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json', 
        },
        Pio: {
          message: '来自 Potion Maker 的 Pio 酱 ~',
          models: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/index.json', 
        },
      },
      skipHello: false,
      tools: {
        'switch-texture': { visible: true },
        "switch-model" : { visible: true },
        'hitokoto': { visible: true },
        'photo': { visible: true },
        'quit': { visible: true },
        'asteroids' :{visible:true},
      },
    }),
    addonMeting({
      // 设为 `global: true` 可在每个页面显示固定播放器
        global: true,
        props: {
          mini: true,
          fixed: true,
          theme: '#4CAF50',
          server: 'netease',
          type: 'artist',
          id: '12390232',
        },
        options: {
          animationIn: true,
          autoHidden: true,
          lyricHidden: false,
        },
    }),
    addonComponents(),
    addonHitokoto({
      args:[HitokotoType.Animation],
      minLength:0,
      maxLength:30
    })
  ],
  unocss: { safelist},
})
