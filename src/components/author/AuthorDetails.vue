<template>
  <div class="whitespace-pre-line">{{ item.author_description }}</div>
</template>

<script setup lang="ts">
defineProps<{
  item: any //TODO: add model
}>()
</script>
