<template>
  <div
    :class="{ hidden: !isLoading }"
    class="aspect-[4/3] w-full animate-pulse bg-gray-soft"
    v-bind="$attrs"
  ></div>
  <img
    :class="{ hidden: isLoading }"
    class="aspect-[4/3] w-full object-cover object-top"
    :style="{ objectPosition: 'center ' + offsetTop + 'px' }"
    :alt="alt"
    :src="src"
    :srcset="srcset"
    sizes="1px"
    onload="window.requestAnimationFrame(function(){if(!(size=getBoundingClientRect().width))return;onload=null;sizes=Math.ceil(size/window.innerWidth*100)+'vw';});"
    v-bind="$attrs"
    @load="imageLoaded"
  />
</template>

<script setup lang="ts">
defineProps<{
  alt: string
  offsetTop?: number
  src: string
  srcset: string
}>()

const isLoading = ref(true)

const imageLoaded = () => {
  isLoading.value = false
}
</script>
