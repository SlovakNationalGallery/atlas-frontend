<template>
  <button class="w-full border border-black h-0 pb-full p-3">
    <div
      v-if="isChecked"
      class="-mt-0.5 -ml-0.5 w-full h-0 pb-full border-2 border-black box-content rounded-full bg-black pointer-events-none"
    ></div>
    <div
      v-else
      class="-mt-0.5 -ml-0.5 w-full h-0 pb-full border-2 border-black box-content rounded-full pointer-events-none"
    ></div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isChecked?: boolean
}>()
</script>
