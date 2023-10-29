<template>
  <img
    ref="img"
    :srcset="image.srcset"
    :sizes="sizes"
    :src="image.src"
    :width="image.width"
    :height="image.height"
    @load.once="load"
  />
</template>

<script setup lang="ts">
defineProps<{
  image: any //TODO: add model
}>()

const img = ref<any | null>(null)
const sizes = ref('1px')

const load = () => {
  window.requestAnimationFrame(() => {
    const size = img.value?.getBoundingClientRect().width
    if (!size) {
      return
    }

    sizes.value = Math.ceil((size / window.innerWidth) * 100) + 'vw'
  })
}
</script>
