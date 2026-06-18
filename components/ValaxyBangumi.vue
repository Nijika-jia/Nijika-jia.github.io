<script setup lang="ts">
/**
 * 覆盖 valaxy-addon-bangumi 的 ValaxyBangumi 组件
 * 添加 localStorage 缓存，避免每次加载都请求 API
 */
import { isClient } from '@vueuse/core'
import { useRuntimeConfig } from 'valaxy'
import { computed, onBeforeMount, onMounted, ref } from 'vue'

const CACHE_PREFIX = 'bangumi_api_cache_'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24小时

// ---- 缓存拦截 ----
function patchFetch(apiBase: string) {
  if (!isClient) return
  const originalFetch = window.fetch

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : (input as Request).url

    if (!url.startsWith(apiBase)) {
      return originalFetch.call(window, input, init)
    }

    const cacheKey = CACHE_PREFIX + url

    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        localStorage.removeItem(cacheKey)
      }
    }
    catch { /* 忽略 */ }

    const response = await originalFetch.call(window, input, init)

    try {
      const cloned = response.clone()
      const data = await cloned.json()
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
    }
    catch { /* 忽略 */ }

    return response
  }
}

// ---- 直接读取插件配置(不导入插件模块，避免 pnpm 长路径问题) ----
const runtimeConfig = useRuntimeConfig()
const bangumiOptions = computed(() => {
  const options = (runtimeConfig.value.addons['valaxy-addon-bangumi'] as any)?.options
  if (!options) return {}
  return {
    ...options,
    bilibiliEnabled: options.bilibiliEnabled ?? true,
    bgmEnabled: options.bgmEnabled ?? true,
    pageSize: options.pageSize ?? 15,
    customEnabled: options.customEnabled ?? false,
    customLabel: options.customLabel ?? '自定义',
  }
})

const { api, bgmEnabled, bgmUid, bilibiliEnabled, bilibiliUid, customCss, customEnabled, customLabel, pageSize } = bangumiOptions.value

const bangumiRef = ref<HTMLElement>()
const customCssInjected = ref(false)

// 在组件挂载前拦截 fetch
onBeforeMount(() => {
  if (api) patchFetch(api)
})

function injectCustomCss() {
  if (!customCss || customCssInjected.value)
    return

  const sheet = new CSSStyleSheet()
  sheet.replaceSync(customCss)
  bangumiRef.value?.shadowRoot?.adoptedStyleSheets.push(sheet)

  if (bangumiRef.value?.shadowRoot)
    customCssInjected.value = true
}

;(async () => {
  if (!isClient)
    return
  const { defineCustomElements } = await import('bilibili-bangumi-component/loader')
  defineCustomElements()
  injectCustomCss()
})()

onMounted(() =>
  injectCustomCss(),
)
</script>

<template>
  <bilibili-bangumi
    ref="bangumiRef"
    :api="api"
    :bgm-enabled="bgmEnabled"
    :bgm-uid="bgmUid"
    :bilibili-enabled="bilibiliEnabled"
    :bilibili-uid="bilibiliUid"
    :custom-enabled="customEnabled"
    :custom-label="customLabel"
    :page-size="pageSize"
  />
</template>

<style>
:root[class~="light"] bilibili-bangumi {
  --bbc-primary-color: #425aef;
  --bbc-text-base-color: #24292e;
}

:root[class~="dark"] bilibili-bangumi {
  --bbc-primary-color: #2fd8d8;
  --bbc-text-base-color: #f2f2f2;
}
</style>
