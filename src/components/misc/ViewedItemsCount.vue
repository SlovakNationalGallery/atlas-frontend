<template>
  <router-link to="/history" class="relative" @click="emit('close')">
    <div class="flex h-full items-center justify-end">
      <div class="mr-1 text-1.5xl font-sng font-medium">{{ viewedItemsCount }}</div>
      <Icon :name="`${viewedItemsCount ? 'eye-filled' : 'eye'}`" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { viewedItemsCount } = toRefs(useItemStore())
</script>
