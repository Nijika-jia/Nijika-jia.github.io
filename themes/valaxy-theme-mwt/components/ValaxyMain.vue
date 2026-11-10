<script setup lang="ts">
import type { PageData, Post } from 'valaxy'
import { useValaxyI18n } from 'valaxy'
import { formatDate } from '../composables/date'

defineProps<{ frontmatter: Post, data?: PageData }>()
const { $tO } = useValaxyI18n()
</script>

<template>
  <main class="mwt-article">
    <header class="mwt-article__header">
      <p class="mwt-eyebrow">CASE FILE / {{ formatDate(frontmatter.date) }}</p>
      <h1>{{ $tO(frontmatter.title) }}</h1>
      <p v-if="frontmatter.description" class="mwt-article__desc">
        {{ frontmatter.description }}
      </p>
      <div v-if="frontmatter.tags?.length" class="mwt-article__meta">
        <span v-for="tag in frontmatter.tags" :key="tag">#{{ tag }}</span>
      </div>
    </header>
    <div class="mwt-article__body markdown-body">
      <ValaxyMd :frontmatter="frontmatter">
        <slot name="main-content-md" />
        <slot />
      </ValaxyMd>
    </div>
  </main>
</template>
