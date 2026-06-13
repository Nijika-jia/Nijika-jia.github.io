import type {UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonLightGallery } from 'valaxy-addon-lightgallery'
import { addonWaline } from "valaxy-addon-waline";
import { addonLive2d } from 'valaxy-addon-live2d'
import { addonMeting } from 'valaxy-addon-meting'
import { addonComponents } from 'valaxy-addon-components'
// add icons what you will need
const safelist = [
  'i-ri-home-line',
  'i-ri-archive-line',
  'i-ri-folder-line',
  'i-ri-price-tag-3-line',
  'i-ri-links-line',
  'i-ri-gallery-line',
  'i-ri-puzzle-fill',
  'i-ri-user-line',
  'i-ri-heart-2-fill',
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
  themeConfig: {
    banner: {
      enable: true,
      title: '伊地知佳の小站',
      cloud :{
        enable : true
      }
    },
    outlineTitle : '伊地知佳の小站',
    nav: [
      { text: '归档', link: '/archives/', icon: 'i-ri-archive-line' },
      { text: '分类', link: '/categories/', icon: 'i-ri-folder-line' },
      { text: '标签', link: '/tags/', icon: 'i-ri-price-tag-3-line' },
      { text: '友人帐', link: '/links/', icon: 'i-ri-links-line' },
      { text: '相册', link: '/ablums/', icon: 'i-ri-gallery-line' },
      { text: '小项目', link: '/projects/', icon: 'i-ri-puzzle-fill' },
    ],
    bg_image : {
      enable : true,
      url : 'https://pic1.imgdb.cn/item/69bf78c3ccd26bacb4d7cc0c.png',
      dark : 'https://pic1.imgdb.cn/item/69bf78ceccd26bacb4d7cc11.jpg',
      opacity : 0.5
    },
    // 自定义菜单图标（最右侧）
    // menu: {
    //   custom: {
    //     title: 'menu.slides',
    //     url: '/links/',
    //     icon: 'i-ri-keynote-line'
    //   }
    // },
    // 侧边栏配置
    // sidebar: {},
    pages: [
      {
        name: '友人帐',
        url: '/links/',
        icon: 'i-ri-links-line',
        color: 'dodgerblue',
      },
      {
        name: '相册',
        url: '/ablums/',
        icon: 'i-ri-gallery-line',
        color: '#FF5722',
      },
      {
        name: '小项目',
        url: '/projects/',
        icon: 'i-ri-puzzle-fill',
        color: '#66B5A9',
      },
      {
        name: '我の推',
        url: '/girls/',
        icon: 'i-ri-heart-2-fill',
        color: 'hotpink',
      },

    ],
    
    footer: {
      since: 2025,
      beian: {
        enable: false,
        icp: '苏ICP备17038157号',
      },
    },
    // 公告横幅
    notice: {
      enable: true,
      hideInPages: true,
      content: '<center style="font-size: 25px">公告栏</center>学习图论(😪)',
    },
    say :{
      enable : true,
      api:'https://el-bot-api.elpsy.cn/api/words/young',
      hitokoto :{
        enable : false,
        api : 'https://el-bot-api.elpsy.cn/api/words/young'
      }
    },
    colors: {
      primary: '#D5C63A' // 设置为橙色
    },
    fireworks: {
      enable: true,
      colors: ['#D5C63A', '#FCBDC5'] // 自定义颜色
    },
    // 文章类型标记
    // types: {
    //   tutorial: { color: '#4CAF50', icon: '📘' },
    //   news: { color: '#FF5722', icon: '📰' }
    // },
    
  },
  markdown: {
    theme:{
      light : 'material-theme-lighter',
      dark : 'material-theme-darker'
    }
  },
  addons: [
    addonLightGallery(),
    addonWaline({
      serverURL: "https://nijikajia.vercel.app/",		// Waline服务链接
      locale: {
        placeholder: "填写qq邮箱或点击登录，可以展示个人头像",
      },
      comment: true,
      pageview: true,
      search : true,
      reaction : [

      ]
    }),
    addonLive2d({
      global: true,
      enableLive2D: ['Tia'],
      live2DCollection: {
        Tia: {
          message: '来自 Potion Maker 的 Tia 酱 ~',
          models: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json',
          textures: 'https://api.github.com/repos/fghrsh/live2d_api/contents/model/Potion-Maker/Tia/textures',
        },
      },
      skipHello: false,
      // tools : ['hitokoto' , 'asteroids'  , 'switch-texture' , 'photo' , 'info' , 'quit']
    }),
    addonMeting({
      global: true,
      /** @see https://github.com/metowolf/MetingJS */
      props: {
        id: '12390232',
        server: 'netease',
        type: 'artist',
        fixed: true,
        theme: '#4CAF50',
        order: 'random',
        preload: 'none',
        storage: false,
        loop: 'all',
        volume: 0.8,
        mutex: true,
        autoplay: false,
      },
    }),
    addonComponents()
  ],
  unocss: { safelist},
})
