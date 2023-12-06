<template>
  <div role="link" class="relative" @click="visible = true">
    <ItemImage :data="item" />
    <Icon name="enlarge" class="absolute bottom-3 right-3 bg-white border-2 rounded-xl" />
  </div>
  <TransitionSlide mode="out-in">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      @click="visible = false"
    >
      <div
        :class="[images?.length ? 'h-full' : 'max-h-full', 'relative bg-gray-soft w-full max-w-lg']"
        :style="{ aspectRatio: item.image_aspect_ratio }"
        @click.stop
      >
        <img v-if="!images?.length" :src="item.image_src" class="object-contain" />
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
import type Section from '@/models/Section'
import type Item from '@/models/Item'
import type Place from '@/models/Place'
import type Bucketlist from '@/models/Bucketlist'

import ItemImage from '@/components/item/ItemImage.vue'
import ZoomViewer from '@/components/misc/ZoomViewer.vue'

defineProps<{
  item: Item | Place | Section | Bucketlist
  images?: IImage[]
  imgClass?: string
}>()

const visible = ref(false)
</script>
