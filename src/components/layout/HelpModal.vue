<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden md:mx-auto md:max-w-lg"
  >
    <div class="absolute inset-0 cursor-zoom-out bg-black opacity-70" @click="close" />
    <Carousel ref="myCarousel" :items-to-show="2.1" :wrap-around="true" class="min-w-[calc(190%)]">
      <Slide :key="0">
        <HelpStep
          :btn-fn="next"
          title="help_title_1"
          body1="help_body1_1"
          body2="help_body2_1"
          btn-text="Next"
          :active-step="1"
        />
      </Slide>
      <Slide :key="1">
        <HelpStep
          :btn-fn="next"
          title="help_title_2"
          body1="help_body1_2"
          body2="help_body2_2"
          btn-text="Next"
          :active-step="2"
        />
      </Slide>
      <Slide :key="3">
        <HelpStep
          :btn-fn="close"
          title="help_title_3"
          body1="help_body1_3"
          body2="help_body2_3"
          btn-text="I'm in!"
          :active-step="3"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

defineProps({
  visible: Boolean,
})

const emit = defineEmits<{
  close: []
}>()

const myCarousel = ref<typeof Carousel | null>(null)
const next = () => myCarousel.value?.next()
const close = () => emit('close')
</script>
