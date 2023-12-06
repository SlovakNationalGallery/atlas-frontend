<template>
  <TransitionFade>
    <div v-if="item">
      <Banner class="border-b-2" :item="item" />
      <ItemHeader :item="item" />

      <ItemContent :item="item" class="pb-24 pt-8" :description="item.description">
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
          v-model="item.isAuthorOpened"
          class="my-4"
        >
          <template #summary>
            <AuthorSummary :item="item" />
          </template>
          <AuthorDetails :item="item" />
        </Collapsible>

        <Collapsible
          v-if="item.video_embed && item.video_thumbnail"
          v-model="item.isVideoOpened"
          class="my-4"
        >
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

        <Link
          external
          icon="magnifying-glass"
          title="Viac o diele na Webe Umenia"
          description="otvor archív SNG"
          :link="item.webumenia_url"
        />
      </ItemContent>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import Banner from '@/components/bucketlist/Banner.vue'
import ItemHeader from '@/components/item/ItemHeader.vue'
import ItemContent from '@/components/item/ItemContent.vue'
import StoryButton from '@/components/forms/StoryButton.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'
import VideoSummary from '@/components/general/VideoSummary.vue'
import Collapsible from '@/components/general/Collapsible.vue'
import AuthorDetails from '@/components/author/AuthorDetails.vue'
import AuthoritySummary from '@/components/author/AuthoritySummary.vue'
import AuthorSummary from '@/components/author/AuthorSummary.vue'
import AuthorityDetails from '@/components/author/AuthorityDetails.vue'
import Item from '@/models/Item'

const itemStore = useItemStore()
const item = ref<Item | null>(null)

// TODO: add translations

definePage({
  meta: {
    title: 'Detail diela',
  },
})

useFetchDetail(async (id) => {
  item.value = null
  item.value = await itemStore.load(id)
  itemStore.addItemViewed(id)
})
</script>
