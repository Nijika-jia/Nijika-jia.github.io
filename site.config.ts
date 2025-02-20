import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://blog.nijikajia.top/',
  lang: 'zh-CN',
  title: '伊地知佳の博客 | Nijikajia`s Blog',
  subtitle: '',
  author: {
    name: '伊地知佳',
    avatar:'/avatar/avatar.jpg',
    status: {
      emoji : '🌴',
      message : '啵央央~'
    },
    intro : '一个阴暗的虹夏厨'
  },
  favicon : '/avatar/avatar.jpg',
  encrypt: {
    // 开启加密，默认关闭
    enable: false
    // algorithm
    // iv
    // salt
  },
  frontmatter: {
    time_warning: false,
  },
  /**
   * 开启阅读统计
   */
  statistics: {
    enable: true,
    readTime: {
      /**
       * 阅读速度
       */
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },
  search: {
    enable: true,
    type: 'fuse', // 使用本地搜索
  },
  fuse: {
    dataPath: 'valaxy-fuse-list.json', // 搜索数据路径
    options: {
      keys: ['title', 'tags', 'categories',"excerpt","content","link","author"], // 定义搜索的字段
    },
  },
  
  comment : {
    enable : true
  },
  
  description: '一个看到dp就会睡着的入.',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'QQ 2797435460',
      link: 'https://qm.qq.com/q/mzVydOGSly',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Nijika-jia',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'QQ音乐',
      link: 'https://c6.y.qq.com/base/fcgi-bin/u?__=QJbfapKAzmz1',
      icon: 'i-ri-music-fill',
      color: '#13BA74',
    },
    {
      name: '哔哩哔哩',
      link: 'https://b23.tv/hi1Qwaz',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'Twitter',
      link: 'https://x.com/GghHdyhff',
      icon: 'i-ri-twitter-x-fill',
      color: 'black',
    },
    {
      name: 'Luogu',
      link: 'https://www.luogu.com.cn/user/1366148',
      icon: 'i-ri-code-line',
      color: '#0088CC',
    },
    {
      name: 'Steam',
      link: 'https://steamcommunity.com/id/Nijika_jia/',
      icon: 'i-ri-steam-fill',
      color: '#323A5B',
    }
  ],

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    description : '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: '/QR/zfb.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: '/QR/qq.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: '/QR/wechat.png',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
  pageSize : 7,
  mediumZoom : {
    enable : true
  },
  vanillaLazyload: {
    enable: true
  },
})
