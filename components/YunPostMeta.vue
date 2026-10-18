<script lang="ts" setup>
import type { Post } from 'valaxy'
import { useLayout } from 'valaxy'
import YunPostMeta from 'valaxy-theme-yun/components/YunPostMeta.vue'

defineProps<{
  frontmatter: Post
}>()

// 仅在 Post 布局显示
const isPost = useLayout('post')
</script>

<template>
  <YunPostMeta :frontmatter="frontmatter">
    <span v-if="isPost">
      本文总阅读量 <span id="waline-pageview-count" class="waline-pageview-count">{{ '…' }}</span> 次
    </span>
  </YunPostMeta>
</template>
