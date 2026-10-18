<script lang="ts" setup>
import type { LinkType } from 'valaxy-theme-yun'
import { onMounted, ref, watch } from 'vue'
import YunLinkItem from './YunLinkItem.vue'

const props = defineProps<{
  links: string | LinkType[]
  random?: boolean
  errorImg?: string
}>()

const data = ref<LinkType[]>(Array.isArray(props.links) ? [...props.links] : [])
const hydrated = ref(false)
const isClient = typeof window !== 'undefined'

function shuffle(items: LinkType[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

async function load() {
  if (!isClient)
    return

  if (Array.isArray(props.links)) {
    data.value = props.random ? shuffle(props.links) : [...props.links]
    return
  }

  try {
    const response = await fetch(new URL(props.links, window.location.origin), {
      cache: 'no-store',
    })
    if (!response.ok)
      return

    const items = await response.json() as LinkType[]
    if (!Array.isArray(items))
      return

    data.value = props.random ? shuffle(items) : items
  }
  catch {
    // Keep the previous list when the JSON source is temporarily unavailable.
  }
}

onMounted(async () => {
  hydrated.value = true
  await load()
})
watch(() => [props.links, props.random], load)
</script>

<template>
  <div class="yun-links">
    <ul v-if="hydrated && data.length" class="yun-link-items" flex="center wrap">
      <YunLinkItem
        v-for="(link, index) in data"
        :key="link.url"
        :i="index"
        :link="link"
        :error-img="errorImg"
      />
    </ul>
  </div>
</template>
