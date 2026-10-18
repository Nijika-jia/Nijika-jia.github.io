<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'

const { load: loadAniCursor } = useScriptTag('/js/ani-cursor.js', undefined, { manual: true })

const sitePv = ref<number | null>(null)
const siteUv = ref<number | null>(null)
let statsScript: HTMLScriptElement | undefined
let callbackName = ''

function cleanupStatsScript() {
  if (callbackName)
    delete (window as unknown as Record<string, unknown>)[callbackName]
  statsScript?.remove()
  statsScript = undefined
}

function loadBusuanzi() {
  callbackName = `__nijika_busuanzi_${Date.now()}_${Math.random().toString(36).slice(2)}`
  ;(window as unknown as Record<string, unknown>)[callbackName] = (data: { site_pv?: number, site_uv?: number }) => {
    sitePv.value = Number(data.site_pv ?? 0)
    siteUv.value = Number(data.site_uv ?? 0)
    cleanupStatsScript()
  }

  statsScript = document.createElement('script')
  statsScript.async = true
  statsScript.referrerPolicy = 'no-referrer-when-downgrade'
  statsScript.src = `https://busuanzi.ibruce.info/busuanzi?jsonpCallback=${callbackName}`
  statsScript.onerror = cleanupStatsScript
  document.head.appendChild(statsScript)
}

onMounted(() => {
  loadBusuanzi()
  loadAniCursor()
})

onUnmounted(cleanupStatsScript)
</script>

<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>本站总访问量 <span id="busuanzi_value_site_pv">{{ sitePv ?? '' }}</span> 次</div>
    <div>本站访客数 <span id="busuanzi_value_site_uv">{{ siteUv ?? '' }}</span> 人次</div>

    <VCLiveTime mt="2" start-time="2025-01-20">
      <template #live-time-before>
        <span>本站已运行</span>
      </template>
    </VCLiveTime>
  </YunFooter>
</template>
