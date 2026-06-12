<script lang="ts" setup>
/**
 * AniCursor - 动画光标组件
 * 通过加载 /js/ani-cursor.js 脚本来应用 .ani 动画光标
 * 该脚本已在 YunFooter.vue 中通过 useScriptTag 全局加载
 * 此组件仅作为手动引用时的备用入口
 */
import { onMounted } from 'vue'

onMounted(() => {
  // 如果脚本尚未加载（例如未使用 YunFooter），则手动加载
  if (!document.querySelector('script[src="/js/ani-cursor.js"]')) {
    const script = document.createElement('script')
    script.src = '/js/ani-cursor.js'
    script.async = true
    document.head.appendChild(script)
  }
})
</script>

<template>
  <div style="display:none" />
</template>
