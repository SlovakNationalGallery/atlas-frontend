<template>
  <div :class="{ 'animate-pulse': isLoading }" class="w-full bg-blue-softest relative">
    <TransitionFade appear>
      <img
        v-if="!isLoading"
        :class="{ hidden: isLoading }"
        class="absolute inset-0 object-cover h-full w-full"
        :src="images[0]"
      />
    </TransitionFade>
    <div class="font-sng py-6 px-4 gap-4 flex flex-col absolute inset-0 top-auto text-white">
      <div class="text-[44px] leading-[52px] font-medium whitespace-pre-line">{{ title }}</div>
      <div v-if="subtitle" class="text-2xl leading-8 whitespace-pre-line">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

defineProps<{
  title: string
  subtitle?: string
}>()

const images = Array.from(Array(4).keys())
  .map((i) => `/banner/banner${i}.png`)
  .sort(() => 0.5 - Math.random())

const { isLoading } = usePreloadImage(images[0])
</script>
