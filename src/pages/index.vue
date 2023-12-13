<template>
  <div class="grow flex flex-col">
    <HomepageHeader class="border-b-2 grow" :title="$t('Welcome to Atlas SNG!')" />
    <OnBoarding v-if="!onboarding" @close="onboarding = true" />
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

import HomepageHeader from '@/components/homepage/HomepageHeader.vue'
import OnBoarding from '@/components/homepage/OnBoarding.vue'

const cookies = useCookies(['onboarding'])
const onboarding = ref(cookies.get('onboarding'))
watch(onboarding, (value) => {
  cookies.set(
    'onboarding',
    onboarding.value,
    // in 24 hours
    { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }
  )

  value && router.push('/homepage')
})

const router = useRouter()
onMounted(() => {
  if (onboarding.value) {
    router.push('/homepage')
  }
})
useDefineTitle('')
</script>
