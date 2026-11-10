<script setup lang="ts">
import { useSiteConfig } from 'valaxy'

const site = useSiteConfig()
</script>

<template>
  <div class="mwt-shell">
    <MwtNav />
    <slot>
      <RouterView />
    </slot>
    <footer class="mwt-footer">
      <span class="mwt-footer__brand">{{ site.title }}</span>
      <span class="mwt-footer__note">非官方主题 · 与游戏开发商无关</span>
    </footer>
  </div>
</template>
