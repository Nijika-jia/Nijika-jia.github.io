<script lang="ts" setup>
import { computed } from 'vue'
import { useValaxyI18n } from 'valaxy'

const props = defineProps<{
  pageTitleClass?: string
  /**
   * @deprecated Use `pageTitleClass` instead
   */
  color?: string
  icon?: string
  // 允许 title 为对象写法 {zh-CN, en}，兼容原字符串写法
  title?: string | Record<string, string>
}>()

const { $t, $tO } = useValaxyI18n()

// 支持 frontmatter title 的两种 i18n 写法：
// 1. 对象写法 {zh-CN: '小项目', en: 'Projects'} → $tO 按当前语言取值
// 2. config 端 $t('key') 返回的 $locale:key 字符串 → 运行时 $t 翻译
// 纯字符串原样返回，保持原行为
const resolvedTitle = computed(() => {
  if (!props.title)
    return ''
  const raw = $tO(props.title)
  if (typeof raw === 'string')
    return $t(raw)
  return raw
})
</script>

<template>
  <header class="post-header">
    <h1
      class="post-title flex-center" p="2" text="2xl center"
      font="serif black"
      :style="`color:${color}`"
      :class="pageTitleClass"
    >
      <div v-if="icon" class="icon" m="r-1 t-1px" inline-flex :class="icon" />
      <span inline-flex class="leading-none">{{ resolvedTitle }}</span>
    </h1>
  </header>
</template>
