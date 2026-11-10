<script setup lang="ts">
import { useSiteConfig, useValaxyI18n } from 'valaxy'

const site = useSiteConfig()
const { $t } = useValaxyI18n()
</script>

<template>
  <header class="mwt-nav">
    <RouterLink to="/" class="mwt-nav__brand">
      <span class="mwt-nav__seal" aria-hidden="true" />
      {{ $t(site.title) }}
    </RouterLink>
    <nav class="mwt-nav__links" aria-label="主导航">
      <RouterLink to="/posts/">记录</RouterLink>
      <RouterLink to="/archives/">归档</RouterLink>
      <RouterLink to="/collections/">合集</RouterLink>
      <RouterLink to="/about/">关于</RouterLink>
    </nav>
  </header>
</template>
