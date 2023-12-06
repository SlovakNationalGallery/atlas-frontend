<template>
  <Card label="História" icon="eye">
    <template #actions>
      <div class="text-blue font-bold text-lg">{{ viewedItemsIds.length }} diel</div>
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
      link="#"
      title="Pridaj nové dielo"
      description="Všetky diela, ktorých kód zadáš sa automaticky uložia sem."
    />
  </Card>
</template>

<script setup lang="ts">
import ItemThumbnail from '@/components/item/ItemThumbnail.vue'
import ItemLoader from '@/components/item/ItemLoader.vue'
import CTABanner from '@/components/general/CTABanner.vue'

// TODO: translations
const { viewedItemsIds } = toRefs(useItemStore())
</script>

