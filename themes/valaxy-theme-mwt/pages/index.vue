<script setup lang="ts">
import { usePostList } from 'valaxy'

const posts = usePostList()
</script>

<template>
  <main class="mwt-home">
    <MwtHero :posts="posts" />
    <MwtPostList :posts="posts" />
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
