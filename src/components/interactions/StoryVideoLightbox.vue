<template>
  <div role="link" class="relative" @click="visible = true">
    <ResponsiveImage
      class="w-full cursor-pointer rounded-xl object-cover"
      :image="story.video_thumbnail"
    />
    <button
      type="button"
      class="absolute bottom-3 right-3 flex appearance-none items-center rounded-xl bg-green px-3 py-2 text-base font-medium text-black"
    >
      <SvgPlay class="mr-2" />
      {{ $t('Play video') }} ({{ story.video_duration }})
    </button>
  </div>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    @click="visible = false"
  >
    <div class="relative max-h-full w-full md:max-w-sm">
      <ResponsiveVideoEmbed
        :src="story.video_embed"
        :width="story.video_aspect_ratio.width"
        :height="story.video_aspect_ratio.height"
      />
      <button
        type="button"
        class="absolute top-0 right-0 cursor-pointer rounded-tr-xl bg-white p-1.5"
        @click.stop="visible = false"
      >
        <SvgClose />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResponsiveImage from '@/components/general/ResponsiveImage.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'

defineProps<{
  story: any //TODO: add model
}>()
const visible = ref(false)
</script>
