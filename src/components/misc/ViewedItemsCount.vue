<template>
  <router-link to="/history" class="relative" @click="emit('close')">
    <div class="flex h-full items-center justify-end">
      <div class="mr-1 text-lg font-bold">{{ viewedItemsCount }}</div>
      <Icon :name="`${viewedItemsCount ? 'eye-filled' : 'eye'}`" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { viewedItemsCount } = toRefs(useInteractionStore())
</script>
