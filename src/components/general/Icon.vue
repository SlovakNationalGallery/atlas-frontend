<template>
  <svg aria-hidden="true" class="w-8 aspect-square">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang='ts'>
defineProps<{
  name: string
}>()
</script>
