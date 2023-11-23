<template>
  <div v-if="place" class="relative w-full border-b-2 border-black bg-gray-softest">
    <ImageMovable v-if="route.query.edit" :data="place" />
    <ImageLightbox v-else :item="place" />
  </div>
  <div v-if="place" class="relative h-full border-black px-4 pb-24 pt-8">
    <div v-if="place.code" class="absolute -top-8 inline-block rounded-md bg-black p-1.5">
      <img class="h-9 w-9" :src="codeImage" :alt="place.code" />
    </div>
    <h2 class="text-1.5xl font-bold">{{ place.title }}</h2>
    <div v-if="place.location_formatted" class="text-lg text-gray-dark">
      {{ $t('Location') }}: {{ place.location_formatted }}
    </div>
    <div class="my-4 space-y-4 markdown" v-html="place.description"></div>
    <Collapsible v-if="place.video_embed && place.video_thumbnail" :model-value="true" class="my-4">
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
    <StoryButton v-if="place.story_id" :story-id="place.story_id" class="my-4" />
  </div>
  <div
    class="pointer-events-none fixed bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent md:max-w-lg"
  >
    <div class="p-4 pt-8">
      <div class="pointer-events-auto flex space-x-4">
        <HistoryBack v-slot="{ back }">
          <ConfirmButton class="group bg-white" @click="back">
            <SvgBack class="mr-2 group-active:stroke-white" />
            {{ $t('Back') }}
          </ConfirmButton>
        </HistoryBack>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Collapsible from '@/components/general/Collapsible.vue'
import ConfirmButton from '@/components/forms/ConfirmButton.vue'
import ImageLightbox from '@/components/general/ImageLightbox.vue'
import ImageMovable from '@/components/general/ImageMovable.vue'
import StoryButton from '@/components/forms/StoryButton.vue'
import VideoSummary from '@/components/general/VideoSummary.vue'
import HistoryBack from '@/components/misc/HistoryBack.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'
import Place from '@/models/Place'

const route = useRoute()
const interactionStore = useInteractionStore()
const placeStore = usePlaceStore()
const place = ref<Place | null>(null)

onMounted(async () => {
  const { id } = useParams()

  place.value = await placeStore.load(id)
  place.value?.id && interactionStore.addPlaceViewed(place.value.id)
})

const codeImage = computed(() => {
  return `${import.meta.env.VITE_API_URL}/img/${place.value?.code}.svg`
})
</script>
