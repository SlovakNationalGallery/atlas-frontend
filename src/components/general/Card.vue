<template>
  <div class="py-6 px-4 flex flex-col gap-4">
    <div class="flex items-center gap-1">
      <Icon v-if="icon" :name="icon" />
      <div class="grow text-2xl font-bold">{{ label }}</div>
      <slot name="actions" />
    </div>
    <div>
      <slot name="default" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
}>()
</script>

