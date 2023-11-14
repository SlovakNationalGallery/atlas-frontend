<template>
  <div v-if="item">
    <Banner :item="item" />
    <div class="relative w-full border-b-2 border-black bg-gray-softest">
      <ImageMovable
        v-if="route.query.edit"
        :alt="`${item.author}: ${item.title}`"
        :src="item.image_src"
        :srcset="item.image_srcset"
        :offset-top="item.offset_top"
      />
      <ImageLightbox
        v-else
        :alt="`${item.author}: ${item.title}`"
        :src="item.image_src"
        :srcset="item.image_srcset"
        :offset-top="item.offset_top"
        :images="item.images"
        :image-aspect-ratio="item.image_aspect_ratio"
      />
    </div>
    <div class="relative h-full border-black px-4 pb-24 pt-8">
      <div v-if="item.code" class="absolute -top-8 inline-block rounded-md bg-black p-1.5">
        <img class="h-9 w-9" :src="codeImage" :alt="item.code" />
      </div>
      <h2 class="text-1.5xl font-bold">{{ item.title }}</h2>
      <h3 class="text-lg text-gray-dark">{{ item.author }} · {{ item.dating }}</h3>
      <div v-if="item.location_formatted" class="text-lg text-gray-dark">
        {{ $t('Location') }}: {{ item.location_formatted }}
      </div>
      <div class="my-4 space-y-4 markdown" v-html="item.description"></div>
      <Collapsible
        v-for="authority in item.authorities"
        :key="authority.id"
        v-model="authority.isOpened"
        class="my-4"
      >
        <template #summary>
          <AuthoritySummary :authority="authority" />
        </template>
        <template v-if="authority.biography">
          <AuthorityDetails :authority="authority" />
        </template>
      </Collapsible>
      <Collapsible
        v-if="!item.authorities.length && item.author_description"
        :model-value="true"
        class="my-4"
      >
        <template #summary>
          <AuthorSummary :item="item" />
        </template>
        <AuthorDetails :item="item" />
      </Collapsible>
      <Collapsible v-if="item.video_embed && item.video_thumbnail" class="my-4">
        <template #summary>
          <VideoSummary
            :thumbnail="item.video_thumbnail"
            :title="item.video_title"
            :subtitle="item.video_subtitle"
          />
        </template>
        <ResponsiveVideoEmbed
          :src="item.video_embed"
          :width="item.video_aspect_ratio?.width"
          :height="item.video_aspect_ratio?.height"
        />
      </Collapsible>
      <StoryButton v-if="item.story_id" :story-id="item.story_id" class="my-4" />
      <WebumeniaButton :url="item.webumenia_url" class="my-4" />
    </div>
    <div
      class="pointer-events-none fixed bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent md:max-w-lg"
    >
      <div class="pointer-events-auto p-4 pt-8">
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
import 'vue3-carousel/dist/carousel.css'

import AuthorityDetails from '@/components/author/AuthorityDetails.vue'
import AuthoritySummary from '@/components/author/AuthoritySummary.vue'
import Collapsible from '@/components/general/Collapsible.vue'
import ImageLightbox from '@/components/general/ImageLightbox.vue'
import ImageMovable from '@/components/general/ImageMovable.vue'
import WebumeniaButton from '@/components/forms/WebumeniaButton.vue'
import StoryButton from '@/components/forms/StoryButton.vue'
import VideoSummary from '@/components/general/VideoSummary.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'
import AuthorSummary from '@/components/author/AuthorSummary.vue'
import AuthorDetails from '@/components/author/AuthorDetails.vue'
import HistoryBack from '@/components/misc/HistoryBack.vue'
import ConfirmButton from '@/components/forms/ConfirmButton.vue'
import Item from '@/models/Item'
import Banner from '@/components/bucketlist/Banner.vue'

const route = useRoute()
const interactionStore = useInteractionStore()
const itemStore = useItemStore()

const item = ref<Item>()

onMounted(async () => {
  const { id } = useParams()

  item.value = await itemStore.load(id)
  interactionStore.addItemViewed(item.value.id)
})

const codeImage = computed(() => {
  return `${import.meta.env.VITE_API_URL}/img/${item.value?.code}.svg`
})
</script>
