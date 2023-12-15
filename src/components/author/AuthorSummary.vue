<template>
  <div class="flex">
    <div class="shrink-0">
      <img
        class="rounded-full w-16"
        src="https://www.webumenia.sk/images/no-image/autori/no-image.svg"
      />
    </div>
    <div class="mx-3 self-center">
      <div class="font-bold leading-[26px]">{{ item.author }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from '@/models/Item'

defineProps<{
  item: Item
}>()
</script>
