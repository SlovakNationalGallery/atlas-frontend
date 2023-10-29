<template>
  <img :srcset="image.srcset" :src="image.src" :width="image.width" :height="image.height" />
</template>

<script setup lang="ts">
defineProps<{
  image: any //TODO: add model
}>()
</script>
