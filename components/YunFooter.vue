<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { onMounted } from 'vue'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'

const { load: loadBusuanzi } = useScriptTag(
  'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
  undefined,
  { manual: true },
)
const { load: loadAniCursor } = useScriptTag('/js/ani-cursor.js', undefined, { manual: true })

onMounted(() => {
  loadBusuanzi()
  loadAniCursor()
})
</script>

<template>
  <YunFooter>
    <!-- 自定义页脚内容 -->
    <div>本站总访问量 <span id="busuanzi_value_site_pv" /> 次</div>
    <div>本站访客数 <span id="busuanzi_value_site_uv" /> 人次</div>

    <VCLiveTime mt="2" start-time="2025-01-20">
      <template #live-time-before>
        <span>本站已运行</span>
      </template>
    </VCLiveTime>
  </YunFooter>
</template>
