<template>
  <article class="mt-8 mb-6 px-4">
    <h3 class="flex items-center justify-between gap-x-1 text-1.5xl font-medium leading-6">
      <span class="grow">{{ $t('Explored artworks') }}</span>
      <span>{{ itemStore.viewedItemsCount }}</span>
      <SvgEye :class="{ '!fill-green': itemStore.viewedItemsCount }" />
    </h3>
    <!-- <template v-if="storyStore.viewedItemsCount">
            <ShareCollection class="mt-4" />
            <div class="mt-3">
                {{ $t('Save the link to your artworks and return to them anywhere') }}
            </div>
        </template> -->
    <div class="mt-6 flex flex-col gap-y-3">
      <router-link to="/#code">
        <Thumbnail :truncate-description="false" class="border-2">
          <template #image>
            <div class="flex h-full w-full items-center justify-center bg-black">
              <SvgCode />
            </div>
          </template>
          <template #icon>
            <SvgCaretRight />
          </template>
          <template #title>{{ $t('Insert artwork code') }}</template>
          <template #description>{{ $t('The artwork will be saved to your history') }}</template>
        </Thumbnail>
      </router-link>
      <ItemLoader v-for="id in itemStore.viewedItemsIds" :id="id" v-slot="{ item }" :key="id">
        <router-link :to="`/item/${id}`">
          <ItemThumbnail :item="item" />
        </router-link>
      </ItemLoader>
    </div>
  </article>
</template>

<script setup lang="ts">
import Thumbnail from '@/components/general/Thumbnail.vue'
import ItemLoader from '@/components/general/ItemLoader.vue'
import ItemThumbnail from '@/components/general/ItemThumbnail.vue'

const itemStore = useItemStore()
</script>
