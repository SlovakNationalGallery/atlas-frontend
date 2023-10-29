<template>
  <iframe
    class="w-full rounded-xl"
    :src="src"
    frameborder="0"
    allow="autoplay;"
    :style="{ aspectRatio: `${width}/${height}` }"
    allowfullscreen
    disablepictureinpicture
  ></iframe>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  width: number
  height: number
}>()
</script>
