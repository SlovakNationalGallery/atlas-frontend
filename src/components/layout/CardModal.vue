<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex justify-center items-center">
    <div class="bg-black opacity-70 absolute inset-0 cursor-zoom-out" @click="emit('close')" />
    <div class="relative mx-4 bg-white w-full max-w-2xl rounded-xl px-4 py-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>
