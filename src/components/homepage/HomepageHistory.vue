<template>
  <Card :label="$t('History')" icon="eye">
    <template #actions>
      <div class="text-blue font-bold text-lg">{{ viewedItemsIds.length }} {{ countLabel }}</div>
    </template>

    <Carousel v-if="viewedItemsIds.length" class="-mx-4 pr-4">
      <ItemLoader v-for="id in viewedItemsIds" :id="id" v-slot="{ item }" :key="id">
        <router-link :to="item.link" class="mr-4 block">
          <div class="min-w-full ml-4">
            <ItemImage class="mb-1 rounded-lg overflow-hidden" :data="item" />
            <div class="text-left">
              <h5 class="truncate font-bold">{{ item.title }}</h5>
              <div class="text-sm text-gray-dark">{{ item.dating_short }}</div>
            </div>
          </div>
        </router-link>
      </ItemLoader>
    </Carousel>

    <CTABanner
      v-else
      :title="$t('Add new artwork')"
      :description="$t('All works you enter the code for will be automatically saved here.')"
      @click="codePanelOpened = true"
    />
  </Card>
</template>

<script setup lang="ts">
import ItemLoader from '@/components/item/ItemLoader.vue'
import CTABanner from '@/components/general/CTABanner.vue'
import Carousel from '@/components/misc/Carousel.vue'
import ItemImage from '@/components/item/ItemImage.vue'

const { viewedItemsIds } = toRefs(useItemStore())
const { codePanelOpened } = toRefs(useInteractionStore())
const countLabel = tc('artwork|artworks', viewedItemsIds.value.length)
</script>

