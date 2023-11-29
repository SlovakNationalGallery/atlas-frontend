<template>
  <div
    class="header sticky top-0 z-20 flex w-full items-center whitespace-nowrap border-2 border-black bg-white"
    :class="{ subpage: title && !isOpenedAbout }"
  >
    <HistoryBack v-slot="{ back }">
      <button
        type="button"
        class="button border-r-2 border-black bg-blue p-2 text-white"
        @click="isFrontpage ? (isOpenedAbout = !isOpenedAbout) : back()"
      >
        <TransitionScale mode="out-in" :duration="300" :delay="0" appear>
          <Icon v-if="!isFrontpage" name="chevron-left" />
          <Icon v-else-if="isOpenedAbout" name="close" />
          <Icon v-else name="sng" />
        </TransitionScale>
      </button>
    </HistoryBack>

    <h1 id="title" class="grow px-2.5 text-1.5xl font-medium">
      <TransitionSlide mode="out-in" :duration="300" :delay="0" appear>
        <div v-if="isOpenedAbout">{{ $t('About the App') }}</div>
        <div v-else-if="title" class="text-center">{{ title }}</div>
        <div v-else>{{ $t('Atlas SNG') }}</div>
      </TransitionSlide>
    </h1>
    <ViewedItemsCount
      class="border-l-2 border-l-transparent px-4 py-2"
      @close="isOpenedAbout = false"
    />
  </div>

  <About :opened="isOpenedAbout" />
</template>

<script setup lang="ts">
import { TransitionScale, TransitionSlide } from '@morev/vue-transitions'

import ViewedItemsCount from '@/components/misc/ViewedItemsCount.vue'
import About from '@/components/about/About.vue'
import HistoryBack from '@/components/misc/HistoryBack.vue'

const props = defineProps<{
  title?: string
}>()

const route = useRoute()

const isOpenedAbout = ref(false)

const isFrontpage = computed(() => route.path === '/homepage' || route.path === '/')
const title = computed(() => props.title ?? route.meta.title)
</script>
<style lang="scss" scoped>
.header {
  transition: border-color 0.3s ease-in-out;

  .button {
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out,
      color 0.3s ease-in-out;
  }

  &.subpage {
    border-left-color: white;
    border-right-color: white;
    border-top-color: white;

    .button {
      background-color: white !important;
      border-color: white;
      color: black;
    }
  }
}
</style>
