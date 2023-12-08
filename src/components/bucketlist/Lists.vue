<template>
  <article class="space-y-6">
    <div v-if="found.length">
      <h3 class="text-1.5xl font-medium leading-6">{{ $t('Found') }}</h3>
      <div class="mt-4 flex flex-col gap-y-4">
        <router-link v-for="item in found" :key="item.id" :to="item.link">
          <ItemThumbnail :item="item" location />
        </router-link>
      </div>
    </div>
    <div v-if="notFound.length">
      <h3 class="text-1.5xl font-medium leading-6">{{ $t('Not found yet') }}</h3>
      <div class="mt-4 flex flex-col gap-y-4">
        <router-link v-for="item in notFound" :key="item.id" :to="item.lockedLink">
          <ItemThumbnail :item="item" locked location />
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type Item from '@/models/Item'

import ItemThumbnail from '@/components/item/ItemThumbnail.vue'

defineProps<{
  found: Item[]
  notFound: Item[]
}>()
</script>
