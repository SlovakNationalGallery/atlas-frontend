<template>
  <div role="link" class="relative" @click="visible = true">
    <ItemImage
      :class="imgClass"
      :offset-top="offsetTop"
      :alt="alt"
      :src="src"
      :srcset="srcset"
    ></ItemImage>
    <Icon name="enlarge" class="absolute bottom-3 right-3 bg-white border-2 rounded-xl" />
  </div>
  <TransitionSlide mode="out-in">
    <div
      v-if="visible && images"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      @click="visible = false"
    >
      <div
        :class="[images.length ? 'h-full' : 'max-h-full', 'relative bg-gray-soft w-full max-w-lg']"
        :style="{ aspectRatio: imageAspectRatio }"
        @click.stop
      >
        <img v-if="!images.length" :src="src" class="object-contain" />
        <ZoomViewer v-else :tile-sources="images" />
        <Icon
          name="close"
          class="absolute top-3 right-3 bg-white border-2 rounded-xl"
          @click.stop="visible = false"
        />
      </div>
    </div>
  </TransitionSlide>
</template>

<script setup lang="ts">
import { TransitionSlide } from '@morev/vue-transitions'

import type { IImage } from '@/models/_Interfaces'

import ZoomViewer from '@/components/misc/ZoomViewer.vue'
import ItemImage from '@/components/general/ItemImage.vue'

defineProps<{
  alt: string
  src: string
  srcset: string
  offsetTop?: number
  images?: IImage[]
  imageAspectRatio?: number
  imgClass?: string
}>()

const visible = ref(false)
</script>
