<template>
  <div class="w-full border border-black h-0 pb-full cursor-pointer">
    <div class="p-3">
      <div
        v-if="isChecked"
        class="-mt-0.5 -ml-0.5 w-full h-0 pb-full border-2 border-black box-content rounded-full bg-black"
      ></div>
      <div
        v-else
        class="-mt-0.5 -ml-0.5 w-full h-0 pb-full border-2 border-black box-content rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isChecked?: boolean
}>()
</script>
