<template>
  <div class="whitespace-pre-line">{{ authority.biography }}</div>
  <div v-if="authority.related_items">
    <div class="my-3 font-bold">{{ $t('Other works by the artist') }}</div>
    <Carousel class="-mx-3">
      <template v-if="isLoading">
        <div v-for="itemId in authority.related_items" :key="`skeleton${itemId}`" class="ml-3">
          <div class="min-w-full pr-2">
            <div class="mb-1 aspect-[4/3] w-full animate-pulse rounded-lg bg-gray-soft"></div>
            <div class="mb-1 h-3 w-full animate-pulse rounded-lg bg-gray-soft"></div>
            <div class="mb-1 h-3 w-full animate-pulse rounded-lg bg-gray-soft"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-for="(item, i) in relatedItems" :key="`slide${item.id}`" class="ml-3">
          <div class="min-w-full" @click="openPreview(item)">
            <ItemImage class="mb-1 rounded-lg overflow-hidden" :data="item" />
            <div class="text-left">
              <h5 class="truncate font-bold">{{ item.title }}</h5>
              <div class="text-sm text-gray-dark">{{ item.dating_short }}</div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>

    <TransitionSlide>
      <ItemPreview v-if="previewItem" :item="previewItem" @close="closePreview" />
    </TransitionSlide>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { TransitionSlide } from '@morev/vue-transitions'

import Carousel from '@/components/misc/Carousel.vue'
import ItemPreview from '@/components/item/ItemPreview.vue'
import ItemImage from '@/components/item/ItemImage.vue'
import Authority from '@/models/Authority'
import Item from '@/models/Item'

const props = defineProps<{
  authority: Authority
}>()

const relatedItems = ref<Item[]>([])
const previewItem = ref<Item | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  if (props.authority.related_items.length > 0) {
    try {
      const response = await axios.get(
        `/api/related_items/${props.authority.related_items.join(',')}`
      )
      relatedItems.value = response.data.data.map((item: any) => new Item(item))
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})

const openPreview = (item: any) => {
  previewItem.value = item
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  previewItem.value = null
  document.body.style.overflow = 'auto'
}
</script>
