<template>
  <img :srcset="image.srcset" :src="image.src" :width="image.width" :height="image.height" />
</template>

<script setup lang="ts">
import type { IImage } from '@/models/_Interfaces'

defineProps<{
  image: IImage
}>()
</script>
