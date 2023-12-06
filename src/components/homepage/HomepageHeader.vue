<template>
  <div :class="{ 'animate-pulse': isLoading }" class="aspect-[3/4] w-full bg-15-blue relative">
    <TransitionFade appear>
      <img
        v-if="!isLoading"
        :class="{ hidden: isLoading }"
        class="aspect-[3/4] w-full object-cover object-top"
        :src="images[0]"
      />
    </TransitionFade>
    <div class="py-6 px-4 gap-4 flex flex-col absolute inset-0 top-auto text-white">
      <div class="text-[44px] leading-[52px] font-medium">Spoznávaj SNG vlastným tempom</div>
      <div class="text-2xl">Zadaj kód diela a spoznaj  jeho príbeh</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

// TODO: get the right images
const images = [
  'https://picsum.photos/id/552/600/800',
  'https://picsum.photos/id/350/600/800',
  'https://picsum.photos/id/412/600/800',
  'https://picsum.photos/id/229/600/800',
  'https://picsum.photos/id/397/600/800',
].sort(() => 0.5 - Math.random())

const { isLoading } = preloadImage(images[0])
</script>
