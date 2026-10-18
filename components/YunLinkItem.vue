<script setup lang="ts">
import type { LinkType } from 'valaxy-theme-yun'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  i: number
  errorImg?: string
  link: LinkType
}>()

const placeholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#f1f5f9"/><circle cx="32" cy="25" r="10" fill="#94a3b8"/><path d="M14 56c2-12 10-19 18-19s16 7 18 19" fill="#94a3b8"/></svg>',
)}`

const site = computed(() => {
  try {
    return new URL(props.link.url)
  }
  catch {
    return null
  }
})

const candidates = computed(() => {
  const urls: string[] = []
  const avatar = props.link.avatar?.trim()

  if (avatar)
    urls.push(avatar)

  if (site.value) {
    urls.push(`${site.value.origin}/favicon.ico`)
    urls.push(`https://icons.duckduckgo.com/ip3/${site.value.hostname}.ico`)
    urls.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(site.value.hostname)}&sz=128`)
  }

  urls.push(props.errorImg || placeholder)
  return urls
})

const candidateIndex = ref(0)
const currentSrc = ref('')

watch(candidates, (urls) => {
  candidateIndex.value = 0
  currentSrc.value = urls[0] || placeholder
}, { immediate: true })

function onError() {
  const nextIndex = candidateIndex.value + 1
  if (nextIndex < candidates.value.length) {
    candidateIndex.value = nextIndex
    currentSrc.value = candidates.value[nextIndex] || placeholder
  }
  else {
    currentSrc.value = placeholder
  }
}

</script>

<template>
  <li
    class="yun-link-item inline-flex"
    :style="{
      '--primary-color': link.color,
    }"
  >
    <a
      class="yun-link-url" p="x-4 y-2"
      :href="link.url" :title="link.name"
      alt="portrait" rel="friend" target="_blank"
    >
      <div class="yun-link-left">
        <div class="yun-link-avatar size-16 overflow-hidden flex-center">
          <img
            class="size-full object-center object-cover m-0! max-w-unset!"
            loading="lazy"
            :src="currentSrc" :alt="link.name || link.blog"
            referrerpolicy="no-referrer"
            @error="onError"
          >
        </div>
      </div>
      <div class="yun-link-info" m="l-2">
        <div class="yun-link-blog" font="serif black">{{ link.blog }}</div>
        <div class="yun-link-desc">{{ link.desc }}</div>
      </div>
    </a>
  </li>
</template>
