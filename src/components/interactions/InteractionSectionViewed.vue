<template>
  <div v-if="section" class="flex opacity-60 text-gray-softest">
    <div class="flex-none mr-2">
      <SvgEye />
    </div>
    <span>
      {{ $t('Viewed') }}
      <router-link class="underline hover:no-underline" :to="section.link">{{
        section.title
      }}</router-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import Section from '@/models/Section'

defineProps<{
  section: Section
}>()
</script>
