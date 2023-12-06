<template>
  <div class="relative w-full border-b-2 border-black bg-gray-softest">
    <ImageMovable v-if="route.query.edit" :data="item" />
    <ImageLightbox
      v-else-if="!locked"
      :item="item"
      :images="item instanceof Item ? item.images : undefined"
    />
    <ItemImage v-else class="grayscale" :data="item" />
    <div
      v-if="item.code || locked"
      class="absolute bottom-0 left-4 translate-y-1/2 inline-block rounded-lg bg-white border-2 p-1.5"
    >
      <Icon v-if="locked" name="scavenger" />
      <img v-else class="h-8 w-8 invert" :src="codeImage" :alt="item.code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Place from '@/models/Place'
import Item from '@/models/Item'
import Section from '@/models/Section'
import Bucketlist from '@/models/Bucketlist'
import ImageMovable from '@/components/general/ImageMovable.vue'
import ImageLightbox from '@/components/general/ImageLightbox.vue'
import ItemImage from '@/components/item/ItemImage.vue'

const props = defineProps<{
  item: Item | Place | Section | Bucketlist
  locked?: boolean
}>()

const route = useRoute()

const codeImage = computed(() => `${import.meta.env.VITE_API_URL}/img/${props.item.code}.svg`)
</script>


