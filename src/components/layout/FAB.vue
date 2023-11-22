<template>
  <Button class="rounded-full" @click="codePanelOpened = true">
    <div class="flex font-medium leading-[28px]">
      <Icon name="code" size="28px" />
      <TransitionExpand axis="x">
        <div v-if="openedState" class="whitespace-nowrap ml-2">Zadaj kód</div>
      </TransitionExpand>
    </div>
  </Button>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions'
import { useWindowScroll } from '@vueuse/core'

// TODO: translate btn label
const props = defineProps<{
  isOpened?: boolean
}>()

const { y } = useWindowScroll()

const { codePanelOpened } = toRefs(useInteractionStore())

const openedState = ref(true)

watch(y, (value, oldValue) => (openedState.value = value <= oldValue))
watch(
  () => props.isOpened,
  (value) => (openedState.value = value)
)
</script>
