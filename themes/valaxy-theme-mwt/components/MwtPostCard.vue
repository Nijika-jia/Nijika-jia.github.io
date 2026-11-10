<script setup lang="ts">
import type { Post } from 'valaxy'
import { useValaxyI18n } from 'valaxy'
import { formatDate } from '../composables/date'

defineProps<{ post: Post, index: number }>()
const { $tO } = useValaxyI18n()
</script>

<template>
  <article class="mwt-card">
    <span class="mwt-card__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
    <div class="mwt-card__body">
      <div class="mwt-card__meta">
        <time v-if="post.date">{{ formatDate(post.date) }}</time>
        <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
        <span v-if="post.draft" class="mwt-card__draft">DRAFT</span>
      </div>
      <h3>
        <RouterLink :to="post.path || '/'">
          {{ $tO(post.title) || '无题' }}
        </RouterLink>
      </h3>
      <p v-if="post.description">
        {{ post.description }}
      </p>
    </div>
    <span class="mwt-card__stamp" aria-hidden="true">归档</span>
  </article>
</template>
