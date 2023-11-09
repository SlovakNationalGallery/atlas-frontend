<template>
  <div class="whitespace-pre-line">{{ item.author_description }}</div>
</template>

<script setup lang="ts">
import Item from '@/models/Item'

defineProps<{
  item: Item
}>()
</script>
