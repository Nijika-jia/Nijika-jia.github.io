import { readonly, ref } from 'vue'

interface BusuanziPayload {
  site_pv?: number
  site_uv?: number
}

export interface SiteStats {
  sitePv: number
  siteUv: number
}

const sitePv = ref<number | null>(null)
const siteUv = ref<number | null>(null)

let pendingRequest: Promise<SiteStats | null> | null = null
let activeScript: HTMLScriptElement | undefined
let activeCallback = ''
let timeoutId: number | undefined
let lastLoadedAt = 0

const CACHE_DURATION = 60_000
const REQUEST_TIMEOUT = 8_000

function cleanupRequest() {
  if (timeoutId !== undefined)
    window.clearTimeout(timeoutId)

  activeScript?.remove()
  activeScript = undefined

  if (activeCallback) {
    delete (window as unknown as Record<string, unknown>)[activeCallback]
    activeCallback = ''
  }
}

function normalizeCount(value: unknown) {
  const count = Number(value)
  return Number.isFinite(count) ? count : 0
}

export function loadSiteStats() {
  if (typeof window === 'undefined')
    return Promise.resolve(null)

  if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname))
    return Promise.resolve(null)

  if (sitePv.value !== null && Date.now() - lastLoadedAt < CACHE_DURATION)
    return Promise.resolve({ sitePv: sitePv.value, siteUv: siteUv.value ?? 0 })

  if (pendingRequest)
    return pendingRequest

  pendingRequest = new Promise<SiteStats | null>((resolve) => {
    let settled = false
    const callbackName = `__nijika_site_stats_${Date.now()}_${Math.random().toString(36).slice(2)}`

    const finish = (result: SiteStats | null) => {
      if (settled)
        return

      settled = true
      cleanupRequest()
      pendingRequest = null
      resolve(result)
    }

    activeCallback = callbackName
    ;(window as unknown as Record<string, (payload: BusuanziPayload) => void>)[callbackName] = (payload) => {
      const result = {
        sitePv: normalizeCount(payload.site_pv),
        siteUv: normalizeCount(payload.site_uv),
      }

      sitePv.value = result.sitePv
      siteUv.value = result.siteUv
      lastLoadedAt = Date.now()
      finish(result)
    }

    const endpoint = new URL('https://busuanzi.ibruce.info/busuanzi')
    endpoint.searchParams.set('jsonpCallback', callbackName)
    endpoint.searchParams.set('_', Date.now().toString())

    activeScript = document.createElement('script')
    activeScript.async = true
    activeScript.referrerPolicy = 'no-referrer-when-downgrade'
    activeScript.src = endpoint.toString()
    activeScript.onerror = () => finish(null)
    document.head.appendChild(activeScript)

    timeoutId = window.setTimeout(() => finish(null), REQUEST_TIMEOUT)
  })

  return pendingRequest
}

export function useSiteStats() {
  return {
    sitePv: readonly(sitePv),
    siteUv: readonly(siteUv),
    loadSiteStats,
  }
}
