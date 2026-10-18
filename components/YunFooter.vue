<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import { useSiteStats } from '../composables/useSiteStats'
import siteData from '../data/site.json'
import siteStats from '../data/site-stats.json'

const { load: loadAniCursor } = useScriptTag('/js/ani-cursor.js', undefined, { manual: true })
const { sitePv, siteUv, loadSiteStats } = useSiteStats()
const uptime = ref<{ days: number, hours: number, minutes: number, seconds: number } | null>(null)
const rawStartedAt = siteData.startedAt || '2025-01-20T00:00:00+08:00'
const startedAtWithTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(rawStartedAt)
  ? rawStartedAt
  : `${rawStartedAt.replace(' ', 'T')}+08:00`
const startedAtValue = Date.parse(startedAtWithTimezone)
const startedAt = Number.isFinite(startedAtValue)
  ? startedAtValue
  : Date.parse('2025-01-20T00:00:00+08:00')
const displayedSitePv = computed(() => sitePv.value ?? siteStats.site_pv)
const displayedSiteUv = computed(() => siteUv.value ?? siteStats.site_uv)
let uptimeTimer: number | undefined

function updateUptime() {
  const elapsed = Math.max(0, Date.now() - startedAt)
  uptime.value = {
    days: Math.floor(elapsed / 86_400_000),
    hours: Math.floor((elapsed % 86_400_000) / 3_600_000),
    minutes: Math.floor((elapsed % 3_600_000) / 60_000),
    seconds: Math.floor((elapsed % 60_000) / 1_000),
  }
}

onMounted(() => {
  loadAniCursor()
  void loadSiteStats()
  updateUptime()
  uptimeTimer = window.setInterval(updateUptime, 1000)
})

onUnmounted(() => {
  if (uptimeTimer !== undefined)
    window.clearInterval(uptimeTimer)
})
</script>

<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>本站总访问量 <span>{{ displayedSitePv }}</span> 次</div>
    <div>本站访客数 <span>{{ displayedSiteUv }}</span> 人次</div>
    <div v-if="uptime">
      本站已运行 {{ uptime.days }} 天
      {{ uptime.hours }} 小时
      {{ uptime.minutes }} 分
      {{ uptime.seconds }} 秒
    </div>
    <div v-else>本站已运行 -- 天 -- 小时 -- 分 -- 秒</div>
  </YunFooter>
</template>
