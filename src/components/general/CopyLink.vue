<template>
  <Button class="w-full" variant="outline" @click="onCopy">
    <template #prefix>
      <div class="grow text-lg flex items-center gap-2 text-black">
        <Icon name="link" class="w-6" />
        <div>{{ link }}</div>
      </div>
    </template>
    <div>
      <TransitionSlide mode="out-in" :duration="300" :delay="0" appear>
        <div v-if="!done" class="font-bold">{{ $t('Copy') }}</div>
        <div v-else class="font-bold">{{ $t('Link copied') }}</div>
      </TransitionSlide>
    </div>
  </Button>
</template>

<script setup lang="ts">
import { TransitionSlide } from '@morev/vue-transitions'

const props = defineProps<{
  link: string
}>()

const done = ref(false)

const link = computed(() => props.link.replace(/(https?:\/\/)?(www\.)?/, ''))

const onCopy = async () => {
  await navigator.clipboard.writeText(props.link)

  done.value = true
  await new Promise((resolve) => setTimeout(resolve, 3000))
  done.value = false
}
</script>
