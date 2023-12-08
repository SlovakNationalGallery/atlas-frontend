<template>
  <Button class="!rounded-full" @click="codePanelOpened = true">
    <div class="flex font-medium leading-[28px]">
      <Icon name="code" class="w-7" />
      <TransitionExpand axis="x">
        <div v-if="openedState" class="whitespace-nowrap ml-2 flex items-center">
          {{ $t('Enter the code') }}
        </div>
      </TransitionExpand>
    </div>
  </Button>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions'
import { useWindowScroll, watchDebounced } from '@vueuse/core'

const props = defineProps<{
  isOpened?: boolean
}>()

const { y } = useWindowScroll()

const { codePanelOpened } = toRefs(useInteractionStore())

const openedState = ref(true)

watchDebounced(y, (value, oldValue) => (openedState.value = value <= oldValue), {
  debounce: 100,
})
watch(
  () => props.isOpened,
  (value) => (openedState.value = value)
)
</script>
