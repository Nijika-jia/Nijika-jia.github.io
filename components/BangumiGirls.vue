<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const BGM_UID = '1258027'
const API = 'https://api.bgm.tv'
const HEADERS = { 'User-Agent': 'Nijikajia/blog' }
const CACHE_KEY = 'bangumi_girls_cache'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 缓存有效期 24小时

interface GirlData {
  name: string
  url: string
  avatar: string
  from: string
  reason: string
}

const girls = ref<GirlData[]>([])
const loading = ref(true)
const error = ref('')
const progress = ref(0)
const total = ref(0)

// ---- 缓存操作 ----
function loadCache(): GirlData[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return data
  }
  catch {
    return null
  }
}

function saveCache(data: GirlData[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  }
  catch { /* localStorage 满了就忽略 */ }
}

// ---- API 操作 ----
async function fetchSubjectName(characterId: number): Promise<string> {
  try {
    const res = await fetch(`${API}/v0/characters/${characterId}/subjects`, { headers: HEADERS })
    if (!res.ok) return ''
    const subjects: any[] = await res.json()
    const anime = subjects.find((s: any) => s.type === 2)
    const game = subjects.find((s: any) => s.type === 4)
    const pick = anime || game || subjects[0]
    return pick ? (pick.name_cn || pick.name) : ''
  }
  catch {
    return ''
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// Fisher-Yates 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function fetchAllFromAPI() {
  // 1. 获取角色收藏列表
  const res = await fetch(`${API}/v0/users/${BGM_UID}/collections/-/characters?limit=100&offset=0`, { headers: HEADERS })
  const page1 = await res.json()
  let allChars: any[] = [...page1.data]

  if (page1.total > 100) {
    const res2 = await fetch(`${API}/v0/users/${BGM_UID}/collections/-/characters?limit=100&offset=100`, { headers: HEADERS })
    const page2 = await res2.json()
    allChars = [...allChars, ...page2.data]
  }

  // 2. 先渲染列表
  girls.value = allChars.map((c: any) => ({
    name: c.name,
    url: `https://bgm.tv/character/${c.id}`,
    avatar: c.images?.large || c.images?.medium || c.images?.small || '',
    from: '',
    reason: '',
    _id: c.id,
  }))

  // 3. 逐个获取所属作品
  total.value = girls.value.length
  loading.value = false

  for (let i = 0; i < girls.value.length; i++) {
    const id = (girls.value[i] as any)._id
    const subjectName = await fetchSubjectName(id)
    girls.value[i] = { ...girls.value[i], from: subjectName }
    progress.value = i + 1
    await sleep(150)
  }

  // 清理临时字段并缓存
  const final = girls.value.map(g => {
    const { _id, ...rest } = g as any
    return rest as GirlData
  })
  girls.value = shuffle(final)
  saveCache(final)
}

onMounted(async () => {
  // 优先读缓存
  const cached = loadCache()
  if (cached && cached.length > 0) {
    girls.value = shuffle(cached)
    progress.value = cached.length
    total.value = cached.length
    loading.value = false
    return
  }

  // 无缓存或已过期，从 API 获取
  try {
    await fetchAllFromAPI()
  }
  catch (e: any) {
    error.value = e.message || '加载失败'
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="bangumi-girls-loading">
    <span>正在从 Bangumi 加载角色收藏...</span>
  </div>
  <div v-else-if="error" class="bangumi-girls-error">
    <span>{{ error }}</span>
  </div>
  <div v-else>
    <div v-if="progress < total" class="bangumi-girls-progress">
      <span>正在加载作品信息 {{ progress }}/{{ total }}</span>
    </div>
    <div class="girls">
      <ul class="girl-items">
        <YunGirlItem v-for="girl, i in girls" :key="girl.url" :i="i" :girl="girl" />
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.bangumi-girls-loading,
.bangumi-girls-error,
.bangumi-girls-progress {
  text-align: center;
  padding: 1rem;
  color: #999;
  font-size: 0.85rem;
}
</style>
