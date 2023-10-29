<template>
  <div v-if="item" class="flex opacity-60 text-gray-softest">
    <div class="flex-none mr-2">
      <component :is="icon" :class="iconClass" />
    </div>
    <span>
      {{ label }}
      <router-link class="underline hover:no-underline" :to="`/item/${item.id}`"
        >{{ item.author }} &mdash; {{ item.title }}</router-link
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

import Item from '@/models/Item'

defineProps<{
  item: Item
  label: string
  icon: Component
  iconClass?: string
}>()
</script>
