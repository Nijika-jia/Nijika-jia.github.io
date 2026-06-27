<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MotionVariants } from '@vueuse/motion'
import { TinyColor } from '@ctrl/tinycolor'
import { computed } from 'vue'

// 与 valaxy-theme-yun 的 ProjectItem 接口保持一致
interface ProjectItem {
  emoji?: string
  name?: string
  desc?: string
  color?: string
  gradient?: boolean
  textColor?: string
  docs?: string
  url?: string
  github?: string
  npm?: string
}

// 内联自 valaxy-theme-yun/composables/animation.ts（cubicBezier.easeIn = [0.18, 0.66, 0.05, 0.96]）
// 避免从主题包子路径导入时 vite 无法解析扩展名
function yunSpringVariants(options: { i: number, y?: number, duration?: number, delay?: number }): MotionVariants<never> {
  return {
    initial: { opacity: 0, y: options.y ?? 40 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        delay: options.i * (options.delay ?? 50),
        type: 'spring',
        ease: [0.18, 0.66, 0.05, 0.96],
        damping: 8,
        duration: options.duration ?? 400,
      },
    },
  }
}

const props = defineProps<{
  i: number
  project: ProjectItem
}>()

const motionVariants = yunSpringVariants({ i: props.i, y: 50 })

const cardStyle = computed(() => {
  const styles: CSSProperties = {
    color: props.project.textColor,
  }
  if (props.project.color && (typeof props.project.gradient === 'undefined' || props.project.gradient)) {
    const color = new TinyColor(props.project.color)
    styles['--un-gradient-stops'] = `${color.spin(55).toHexString()}, ${props.project.color}`
    if (!styles.color)
      styles.color = color.isDark() ? 'white' : 'black'
  }
  else {
    styles.backgroundColor = props.project.color || 'rgba(255,255,255,0.9)'
    if (!styles.color)
      styles.color = 'black'
  }
  return styles
})

const githubUrl = computed(() => {
  if (props.project.github)
    return `https://github.com/${props.project.github}`
  else
    return `https://github.com/YunYouJun/${props.project.name}`
})

const npmLink = computed(() => {
  return props.project.npm ? `https://www.npmjs.com/package/${props.project.npm}` : ''
})

const projectUrl = computed(() => {
  return props.project.url || githubUrl.value
})

const links = computed(() => [
  {
    url: projectUrl.value,
    icon: 'i-ri-global-line',
    color: '#6eb7f9',
  },
  {
    url: props.project.docs,
    icon: 'i-ri-book-line',
    color: '#443ed1',
  },
  {
    url: githubUrl.value,
    icon: 'i-ri-github-line',
    color: 'black',
  },
  {
    url: npmLink.value,
    icon: 'i-ri-npmjs-line',
    color: 'red',
  },
])

// emoji 字段若以 `i-` 开头则视为 UnoCSS/iconify 图标类名，按图标方式渲染；
// 否则保留原行为（作为 emoji 字符文本渲染）。
const isIcon = computed(() => typeof props.project.emoji === 'string' && props.project.emoji.startsWith('i-'))
</script>

<template>
  <div
    v-motion="motionVariants"
    flex="~ col center"
    class="m-2 w-90 transform rounded shadow-md grayscale-30 bg-gradient-to-br"
    bg="opacity-80"
    p="x-2 b-12"
    hover="shadow-lg grayscale-0"
    :style="cardStyle"
  >
    <div v-if="project.emoji" class="mt-4" :class="isIcon ? 'text-3xl' : undefined">
      <div v-if="isIcon" :class="project.emoji" />
      <template v-else>{{ project.emoji }}</template>
    </div>
    <a :href="projectUrl" target="_blank" class="text-unset">
      <h2 text="lg" font="bold" m="2">
        {{ project.name || '忘记叫啥了' }}
      </h2>
    </a>
    <small
      class="block" p="2" text="center"
      v-html="project.desc || '说点什么好呢'"
    />
    <div flex="~ center" class="absolute left-0 right-0 bottom-0 h-10">
      <template v-for="item in links" :key="item.icon">
        <YunProjectLinkItem
          v-if="item.url"
          :item="item"
        />
      </template>
    </div>
  </div>
</template>
