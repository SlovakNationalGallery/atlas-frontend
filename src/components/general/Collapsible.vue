<template>
  <div class="collapsible border-2 border-black p-3 rounded-xl">
    <div class="flex" :class="{ 'cursor-pointer': !!slots.content }" @click="isOpened = !isOpened">
      <div class="grow">
        <slot name="summary"></slot>
      </div>
      <div v-if="slots.default">
        <Icon
          class="w-6 icon cursor-pointer transition-transform ease-in-out duration-300"
          name="chevron-down"
          :class="{ 'rotate-180': isOpened }"
        />
      </div>
    </div>
    <TransitionExpand v-if="slots.default">
      <div v-if="isOpened" class="mt-3"><slot /></div>
    </TransitionExpand>
  </div>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions'

const isOpened = defineModel<boolean>()
const slots = useSlots()
</script>
