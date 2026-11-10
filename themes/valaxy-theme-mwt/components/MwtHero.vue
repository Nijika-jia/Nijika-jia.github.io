<script setup lang="ts">
import type { Post } from 'valaxy'
import { useSiteConfig, useValaxyI18n } from 'valaxy'

defineProps<{ posts: Post[] }>()
const site = useSiteConfig()
const { $t } = useValaxyI18n()
</script>

<template>
  <section class="mwt-hero">
    <div class="mwt-hero__meta">
      <span class="mwt-eyebrow">TRIAL ARCHIVE / 001</span>
      <span class="mwt-hero__count">{{ String(posts.length).padStart(2, '0') }} RECORDS</span>
    </div>

    <div class="mwt-hero__grid">
      <div class="mwt-hero__copy">
        <h1>{{ $t(site.title) }}</h1>
        <p class="mwt-hero__desc">{{ $t(site.description) || $t(site.subtitle) }}</p>
        <div class="mwt-hero__links">
          <RouterLink to="/posts/" class="mwt-action">浏览全部记录 <span aria-hidden="true">↗</span></RouterLink>
          <RouterLink to="/archives/" class="mwt-action mwt-action--ghost">按卷宗归档</RouterLink>
        </div>
        <p class="mwt-hero__motto">记录每一次判决之前的证词。</p>
      </div>

      <div class="mwt-hero__seal" aria-hidden="true">
        <svg viewBox="0 0 220 220" fill="none">
          <rect x="38" y="38" width="144" height="144" transform="rotate(45 110 110)" stroke="currentColor" stroke-width="1.5" />
          <circle cx="110" cy="110" r="76" stroke="currentColor" stroke-width="1" opacity=".45" />
          <path d="M110 52v120M62 84h96" stroke="currentColor" stroke-width="1.5" />
          <path d="M62 84 46 122h32L62 84ZM158 84l-16 38h32L158 84Z" stroke="currentColor" stroke-width="1.2" />
          <path d="M110 172h-14M110 172h14" stroke="currentColor" stroke-width="1.2" />
        </svg>
        <span class="mwt-hero__seal-text">TRIAL<br>ARCHIVE</span>
      </div>
    </div>
  </section>
</template>
