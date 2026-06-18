<script lang="ts" setup>
import { ref } from 'vue'

interface GirlData {
  name: string
  url: string
  avatar: string
  from: string
  reason: string
}

// 定义的角色列表
const STATIC_GIRLS: GirlData[] = [
  {
    name: '伊地知虹夏',
    url: 'https://bgm.tv/character/87973',
    avatar: 'https://api.bgm.tv/v0/characters/87973/image?type=small',
    from: '孤独摇滚',
    reason: '天使一样'
  }
]

// 直接使用静态数据
const girls = ref<GirlData[]>([...STATIC_GIRLS])   
</script>

<template>
  <div class="girls">
    <ul class="girl-items">
      <YunGirlItem 
        v-for="(girl, i) in girls" 
        :key="girl.url" 
        :i="i" 
        :girl="girl" 
      />
    </ul>
  </div>
</template>

<style lang="scss">
/* 样式保持不变 */
</style>