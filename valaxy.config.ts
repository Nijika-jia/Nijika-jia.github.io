import type {UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonLightGallery } from 'valaxy-addon-lightgallery'
import { addonWaline } from "valaxy-addon-waline";
import { addonLive2d } from 'valaxy-addon-live2d'
import { addonMeting } from 'valaxy-addon-meting'
import { addonComponents } from 'valaxy-addon-components'
import { addonHitokoto, HitokotoType } from 'valaxy-addon-hitokoto';
import { addonBangumi } from 'valaxy-addon-bangumi';
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
  vite: {
    optimizeDeps: {
      include: ['@braintree/sanitize-url'],
    },
  },
  themeConfig: {
    banner: {
      enable: true,
      title: '伊地知佳の小站',
      cloud :{
        enable : true
      },
      duration: 500,
    },
    outlineTitle : '伊地知佳の小站',
    nav: [
      { text: '文章', link: '/posts/', icon: 'i-ri-article-line' },
      { text: '合集', link: '/collections/', icon: 'i-ri:dashboard-line' },
      { text: '归档', link: '/archives/', icon: 'i-ri-archive-line' },
      { text: '分类', link: '/categories/', icon: 'i-ri:folder-5-line'},
      { text: '标签', link: '/tags/', icon: 'i-ri-price-tag-3-line' },
      { text: '友人帐', link: '/links/', icon: 'i-ri-links-line' },
      { text: '相册', link: '/ablums/', icon: 'i-ri-gallery-line' },
      { text: '小项目', link: '/projects/', icon: 'i-ri-puzzle-fill' },
      { text: '追番', link: '/bangumi/', icon: 'i-ri-tv-line' },
      { text: '我の推', link: '/girls/', icon: 'i-ri-heart-2-fill' }
    ],
    bg_image : {
      enable : true,
      url : 'https://pic1.imgdb.cn/item/69d0b89a75fc555b7336c954.png',
      dark : 'https://pic1.imgdb.cn/item/6a32d53da6693733f7e0caec.png',
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
        name: '分类',
        url: '/categories/',
        icon: 'i-ri-folder-line',
        color: '#2196F3',
      },
      {
        name: '标签',
        url: '/tags/',
        icon: 'i-ri-price-tag-3-line',
        color: '#FFC107',
      },
      {
        name: '友人帐',
        url: '/links/',
        icon: 'i-ri-links-line',
        color: 'dodgerblue',
      },
      {
        name: '文章',
        url: '/posts/',
        icon: 'i-ri-article-line',
        color: '#4CAF50',
      },
      {
        name: '小项目',
        url: '/projects/',
        icon: 'i-ri-puzzle-fill',
        color: '#66B5A9',
      },
    ],
    types: {
      link: {
        color: '#1890ff',
        icon: 'i-ri-link',
      },
      bilibili: {
        color: '#FF8EB3',
        icon: 'i-ri-bilibili-line',
      },
      github: {
        color: '#6D2783',
        icon: 'i-ri-github-line',
      },
      AI: {
        color: '#FF5722',
        icon: 'i-ri:speak-line',
      },
    },
    footer: {
      since: 2025,
      beian: {
        enable: false,
        icp: '苏ICP备17038157号',
      },
      cloud: {
        enable: true,
      },
    },
    // 公告横幅
    notice: {
      enable: false,
      hideInPages: true,
      content: '<span>一言: {{ hitokoto.hitokoto }}</span><span>来自: {{ hitokoto.from }}</span>',
    },
    say :{
      enable : true,
      api:'https://el-bot-api.elpsy.cn/api/setu',
      hitokoto :{
        enable : false,
        api : 'https://el-bot-api.elpsy.cn/api/setu'
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
      pageview: true,
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
