<script lang="ts" setup>
import type { ProjectItem } from 'valaxy-theme-yun'
import { useFrontmatter } from 'valaxy'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface ProjectCategory {
  id?: string
  title: string
  emoji?: string
  collection?: ProjectItem[]
}

type ProjectData = ProjectCategory[] | Record<string, Omit<ProjectCategory, 'id'>>

const fm = useFrontmatter()
const { t } = useI18n()
const curCategory = ref('all')

const categories = computed<ProjectCategory[]>(() => {
  const projects = fm.value.projects as ProjectData | undefined

  if (Array.isArray(projects)) {
    return projects.map(category => ({
      ...category,
      collection: category.collection ?? [],
    }))
  }

  if (projects && typeof projects === 'object') {
    return Object.entries(projects).map(([id, category]) => ({
      id,
      ...category,
      collection: category.collection ?? [],
    }))
  }

  return []
})

function getCategoryKey(category: ProjectCategory) {
  return category.id || category.title
}
</script>

<template>
  <div flex="~ col center">
    <YunPageHeader
      :title="fm.title || t('title.projects')"
      :icon="fm.icon"
      :page-title-class="fm.pageTitleClass"
    />

    <div class="mt-3" flex="~ wrap" justify="center">
      <YunProjectToggleButton
        :active="curCategory === 'all'"
        @click="curCategory = 'all'"
      >
        全部
      </YunProjectToggleButton>
      <YunProjectToggleButton
        v-for="category in categories"
        :key="getCategoryKey(category)"
        :active="getCategoryKey(category) === curCategory"
        @click="curCategory = getCategoryKey(category)"
      >
        <span class="inline-flex">{{ category.emoji }}</span>
        <span class="inline-flex">{{ category.title }}</span>
      </YunProjectToggleButton>
    </div>

    <div flex="~ wrap" justify="center">
      <template v-for="category in categories" :key="getCategoryKey(category)">
        <YunProjectCollection
          v-if="curCategory === 'all' || curCategory === getCategoryKey(category)"
          :title="category.title"
          :projects="category.collection"
        />
      </template>
    </div>
  </div>
</template>
