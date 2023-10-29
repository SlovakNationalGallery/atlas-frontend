<template>
  <div class="flex w-full content-center justify-center">
    <span
      v-for="(_, i) in length"
      :key="i"
      class="h-2 w-2 bg-white mx-1 rounded-full border-2"
      :class="{ 'bg-black': activeStep === i }"
    >
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  length: number
  activeStep: number
}>()
</script>
