<template>
  <div class="flex-col flex mx-1 bg-white h-full max-w-2xl rounded-xl px-4 py-6">
    <div class="flex-1 text-left">
      <h3 class="font-bold text-2xl my-4">{{ $t(title) }}</h3>
      <div class="text-lg mb-4" v-html="$t(body1)" />
      <div class="text-lg" v-html="$t(body2)" />
    </div>
    <ConfirmButton class="flex-none bottom-0 bg-black text-white mt-6 mb-4" @click="btnFn">{{
      $t(btnText)
    }}</ConfirmButton>
    <ProgressDots :length="3" :active-step="activeStep"></ProgressDots>
  </div>
</template>

<script setup lang="ts">
import ConfirmButton from '@/components/forms/ConfirmButton.vue'
import ProgressDots from '@/components/misc/ProgressDots.vue'

defineProps<{
  title: string
  body1: string
  body2: string
  btnFn: () => void
  btnText: string
  activeStep: number
}>()
</script>
