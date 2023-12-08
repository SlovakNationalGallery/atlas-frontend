<template>
  <TransitionFade>
    <div v-if="item">
      <ItemHeader :item="item" locked />
      <ItemContent
        :item="item"
        locked
        class="pb-24 pt-8"
        :description="item.locked_bucketlist_description"
      >
        <CTABanner
          title="Nájdi kód diela v budove"
          description="Nájdi kód diela v budove"
          @click="codePanelOpened = true"
        />
      </ItemContent>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import CTABanner from '@/components/general/CTABanner.vue'
import Item from '@/models/Item'
import ItemHeader from '@/components/item/ItemHeader.vue'
import ItemContent from '@/components/item/ItemContent.vue'

const itemStore = useItemStore()
const item = ref<Item | null>(null)

useFetchDetail(async (id) => {
  item.value = null
  item.value = await itemStore.load(id)
})

const { codePanelOpened } = toRefs(useInteractionStore())
</script>
