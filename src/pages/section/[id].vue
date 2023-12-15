<template>
  <TransitionFade appear>
    <div v-if="section">
      <ItemHeader :item="section" />
      <ItemContent :item="section" class="pb-24 pt-8" :description="section.description">
        <p class="mb-4 font-bold text-xl">{{ $t('More about artworks in the group') }}</p>
        <div class="flex flex-col space-y-3">
          <router-link v-for="item in section.items" :key="item.id" :to="item.link">
            <ItemThumbnail :item="item" />
          </router-link>
        </div>
      </ItemContent>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import ItemThumbnail from '@/components/item/ItemThumbnail.vue'
import Section from '@/models/Section'
import ItemHeader from '@/components/item/ItemHeader.vue'
import ItemContent from '@/components/item/ItemContent.vue'

const sectionStore = useSectionStore()
const section = ref<Section | null>(null)

useFetchDetail(async (id) => {
  section.value = null
  section.value = await sectionStore.load(id)
})

useDefineTitle(t('Section'))
</script>
