<script lang="ts" setup>
import type { LinkType } from 'valaxy-theme-yun'
import { computed, onMounted, ref, watch } from 'vue'
import YunLinkItem from './YunLinkItem.vue'

const props = defineProps<{
  links: string | LinkType[]
  random?: boolean
  errorImg?: string
}>()

const data = ref<LinkType[]>(Array.isArray(props.links) ? [...props.links] : [])
const hydrated = ref(false)
const isClient = typeof window !== 'undefined'
const isUrlSource = computed(() => typeof props.links === 'string')

function shuffle(items: LinkType[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

async function load() {
  if (!isClient)
    return

  if (Array.isArray(props.links)) {
    data.value = [...props.links]
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

onMounted(() => {
  requestAnimationFrame(async () => {
    hydrated.value = true
    await load()
  })
})
watch(() => [props.links, props.random], load)
</script>

<template>
  <div class="yun-links">
    <ClientOnly v-if="isUrlSource">
      <ul v-if="hydrated && data.length" class="yun-link-items" flex="center wrap">
        <YunLinkItem
          v-for="(link, index) in data"
          :key="link.url"
          :i="index"
          :link="link"
          :error-img="errorImg"
        />
      </ul>
    </ClientOnly>
    <ul v-else-if="data.length" class="yun-link-items" flex="center wrap">
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

<style lang="scss">
.yun-links {
  .yun-link-items {
    padding-left: 0;
  }

  .yun-link-url {
    --smc-link-color: var(--primary-color);

    display: inline-flex;
    text-align: center;
    justify-self: center;
    line-height: 1.5;
    margin: 0.5rem;
    transition: var(--va-transition-duration-fast);
    color: var(--primary-color, black);
    border: 1px solid var(--primary-color, gray);

    &:hover {
      color: white;
      background-color: var(--primary-color, gray);
      box-shadow: 0 2px 20px var(--primary-color, gray);
    }

    .yun-link {
      &-left {
        line-height: 0;
      }

      &-avatar {
        margin: 0;
        display: inline-flex;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid var(--primary-color, gray);
        transition: var(--va-transition-duration-moderate);

        &:hover {
          box-shadow: 0 0 20px rgb(0 0 0 / 0.1);
        }
      }

      &-desc {
        font-size: 0.8rem;
        width: 10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .yun-link-info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
