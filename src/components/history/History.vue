<template>
  <Card :label="$t('History')" icon="eye">
    <template #actions>
      <div class="text-blue font-bold text-lg">{{ viewedItemsIds.length }} {{ countLabel }}</div>
    </template>

    <div v-if="viewedItemsIds.length" class="flex flex-col gap-3">
      <ItemLoader v-for="id in viewedItemsIds" :id="id" v-slot="{ item }" :key="id">
        <router-link :to="item.link">
          <ItemThumbnail :item="item" />
        </router-link>
      </ItemLoader>
    </div>
    <CTABanner
      v-else
      :title="$t('Add new artwork')"
      :description="$t('All works you enter the code for will be automatically saved here.')"
      @click="codePanelOpened = true"
    />
  </Card>
</template>

<script setup lang="ts">
import ItemThumbnail from '@/components/item/ItemThumbnail.vue'
import ItemLoader from '@/components/item/ItemLoader.vue'
import CTABanner from '@/components/general/CTABanner.vue'

const { viewedItemsIds } = toRefs(useItemStore())
const { codePanelOpened } = toRefs(useInteractionStore())
const countLabel = tc('artwork|artworks', viewedItemsIds.value.length)
</script>

