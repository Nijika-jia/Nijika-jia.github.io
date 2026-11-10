<script setup lang="ts">
import type { Post } from 'valaxy'

defineProps<{ posts: Post[] }>()
</script>

<template>
  <section class="mwt-list">
    <div class="mwt-section-head">
      <h2>RECENT RECORDS</h2>
      <span>最新记录</span>
    </div>
    <MwtPostCard v-for="(post, index) in posts" :key="post.path" :post="post" :index="index" />
  </section>
</template>
