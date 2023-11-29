<template>
  <div class="grow pb-24">
    <HomepageHeader class="border-b-2" />
    <Bucketlist :id="bucketlistId" class="border-b-2" />
    <History />
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

import HomepageHeader from '@/components/homepage/HomepageHeader.vue'
import History from '@/components/homepage/HomepageHistory.vue'
import Bucketlist from '@/components/history/Bucketlist.vue'

const { toggle: toggleSurvey, shouldLaunch: shouldSurveyLaunch } = useSurvey()
const bucketlistId = import.meta.env.VITE_DEFAULT_BUCKETLIST

watchDebounced(
  shouldSurveyLaunch,
  () => {
    if (shouldSurveyLaunch.value) {
      toggleSurvey()
    }
  },
  { immediate: true, debounce: 1000 }
)
</script>
