<script setup lang="ts">
/**
 * 覆盖 valaxy-addon-bangumi 的 ValaxyBangumi 组件
 * 添加 localStorage 缓存，避免每次加载都请求 API
 */
import { isClient } from '@vueuse/core'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useAddonBangumi } from 'valaxy-addon-bangumi/client'

const CACHE_PREFIX = 'bangumi_api_cache_'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 24小时

// ---- 缓存拦截 ----
function patchFetch(apiBase: string) {
  if (!isClient) return
  const originalFetch = window.fetch

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : (input as Request).url

    // 只拦截追番 API 的请求
    if (!url.startsWith(apiBase)) {
      return originalFetch.call(window, input, init)
    }

    const cacheKey = CACHE_PREFIX + url

    // 检查缓存
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          // 缓存命中，返回模拟 Response
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        localStorage.removeItem(cacheKey)
      }
    }
    catch { /* 忽略缓存读取错误 */ }

    // 缓存未命中，发起真实请求
    const response = await originalFetch.call(window, input, init)

    // 缓存响应数据
    try {
      const cloned = response.clone()
      const data = await cloned.json()
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))
    }
    catch { /* 缓存写入失败不影响正常功能 */ }

    return response
  }
}

const bangumiRef = ref<HTMLElement>()
const customCssInjected = ref(false)

const bangumiOptions = useAddonBangumi()
const { api, bgmEnabled, bgmUid, bilibiliEnabled, bilibiliUid, customCss, customEnabled, customLabel, pageSize } = bangumiOptions.value

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
