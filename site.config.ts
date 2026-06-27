import { $t, defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://nijika-jia.github.io/',
  lang: 'zh-CN',
  languages: ['zh-CN', 'en'],
  title: $t('site.title'),
  description: $t('site.description'),
  subtitle: '',
  author: {
    name: '伊地知佳',
    avatar:'https://avatars.githubusercontent.com/u/181221850?v=4',
    status: {
      emoji : '🎯',
      message : '虹夏虹夏虹~'
    },
    intro : '一只虹夏厨'
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
    provider: 'fuse',
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
  
  timezone: 'Asia/Shanghai',
  lastUpdated: true,
  orderBy: 'date',
  excerpt: {
    auto: true,
    length: 100,
  },
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
      name: 'Discord',
      link: 'https://discordapp.com/users/1303909108667121726',
      icon: 'i-ri-discord-line',
      color: '#13BA74',
    },
    {
      name: 'LeetCode',
      link: 'https://leetcode.cn/u/yi-di-zhi-jia/',
      icon: 'i-ri-code-s-slash-fill',
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
    title: '',
    description : '',
    methods: [
      {
        name: '支付宝',
        url: '/QR/zfb.png',
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
  codeHeightLimit: 1000,
})
