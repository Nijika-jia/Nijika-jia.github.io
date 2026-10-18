<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { onMounted } from 'vue'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import siteStats from '../data/site-stats.json'

const { load: loadAniCursor } = useScriptTag('/js/ani-cursor.js', undefined, { manual: true })

onMounted(() => {
  loadAniCursor()
})
</script>

<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>本站总访问量 <span id="busuanzi_value_site_pv">{{ siteStats.site_pv }}</span> 次</div>
    <div>本站访客数 <span id="busuanzi_value_site_uv">{{ siteStats.site_uv }}</span> 人次</div>
    <div>
      本站已运行 {{ siteStats.uptime_days }} 天
      {{ siteStats.uptime_hours }} 小时
      {{ siteStats.uptime_minutes }} 分
    </div>
  </YunFooter>
</template>
