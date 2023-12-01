<template>
  <TransitionFade appear>
    <div v-if="place">
      <ItemHeader :item="place" />
      <ItemContent :item="place" class="pb-24 pt-8" :description="place.description">
        <Collapsible
          v-if="place.video_embed && place.video_thumbnail"
          :model-value="true"
          class="my-4"
        >
          <template #summary>
            <VideoSummary
              :thumbnail="place.video_thumbnail"
              :title="place.video_title"
              :subtitle="place.video_subtitle"
            />
          </template>
          <ResponsiveVideoEmbed
            :src="place.video_embed"
            :width="place.video_aspect_ratio?.width"
            :height="place.video_aspect_ratio?.height"
          />
        </Collapsible>
      </ItemContent>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import Collapsible from '@/components/general/Collapsible.vue'
import VideoSummary from '@/components/general/VideoSummary.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'
import Place from '@/models/Place'
import ItemHeader from '@/components/item/ItemHeader.vue'
import ItemContent from '@/components/item/ItemContent.vue'

const route = useRoute()
const placeStore = usePlaceStore()
const { id } = useParams()

const place = ref<Place>()

// TODO: add translations
definePage({
  meta: {
    title: 'Detail miesta',
  },
})

onMounted(async () => {
  place.value = await placeStore.load(id)
})
</script>
