<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 p-4 outline-none"
    @click="emit('close')"
  >
    <div class="relative bg-white max-h-full w-full rounded-xl md:max-w-lg" @click="emit('close')">
      <div
        :class="{ 'animate-pulse': isLoading }"
        class="w-full rounded-t-xl bg-15-blue"
        :style="{ aspectRatio: item.image_aspect_ratio }"
      >
        <TransitionFade appear>
          <img
            v-if="!isLoading"
            class="w-full rounded-t-xl"
            :alt="item.title"
            :src="item.image_src"
            :srcset="item.image_srcset"
          />
        </TransitionFade>
      </div>

      <Icon
        name="close"
        class="absolute top-3 right-3 bg-white border-2 rounded-xl"
        @click.stop="emit('close')"
      />
      <ItemContent class="bg-white rounded-b-xl py-4" :item="item">
        <Link
          class="mt-4"
          external
          icon="magnifying-glass"
          title="Viac o diele na Webe Umenia"
          description="otvor archív SNG"
          :link="item.webumenia_url"
        />
      </ItemContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import Item from '@/models/Item'
import ItemContent from '@/components/item/ItemContent.vue'

const props = defineProps<{
  item: Item
}>()

const emit = defineEmits<{
  close: []
}>()

const { isLoading } = preloadImage(props.item.image_src)
</script>
