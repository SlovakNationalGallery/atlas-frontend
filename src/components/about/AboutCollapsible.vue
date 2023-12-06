<template>
  <div ref="el">
    <div class="flex cursor-pointer p-4 text-xl transition-transform" @click="isOpened = !isOpened">
      <div class="grow font-bold text-xl">
        <slot name="summary"></slot>
      </div>
      <Icon
        class="icon cursor-pointer transition-transform ease-in-out duration-300"
        name="chevron-down"
        :class="{ 'rotate-180': isOpened }"
      />
    </div>
    <TransitionExpand>
      <div v-show="isOpened" class="px-4 pb-4">
        <slot />
      </div>
    </TransitionExpand>
  </div>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions'

const props = withDefaults(
  defineProps<{
    initialOpen?: boolean
  }>(),
  {
    initialOpen: false,
  }
)

const el = ref<HTMLDivElement | null>(null)
const isOpened = ref(props.initialOpen)

watch(isOpened, (value) => {
  if (value) {
    nextTick(() => {
      el.value?.scrollIntoView({
        behavior: 'smooth',
      })
    })
  }
})
</script>
