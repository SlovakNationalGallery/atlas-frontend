<template>
  <TransitionFade appear>
    <div class="grow pb-24">
      <HomepageHeader
        class="border-b-2 aspect-[3/4]"
        :title="$t('Explore SNG at your own pace')"
        :subtitle="$t('Enter the artwork code and discover its story')"
      />
      <Bucketlist :id="bucketlistId" class="border-b-2" />
      <History />
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { TransitionFade } from '@morev/vue-transitions'

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

useDefineTitle('')
</script>
