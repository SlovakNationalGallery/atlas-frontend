<template>
  <div class="border-2 border-black p-2.5 rounded-xl">
    <div class="flex" :class="{ 'cursor-pointer': !!slots.content }" @click="isOpened = !isOpened">
      <div class="grow">
        <slot name="summary"></slot>
      </div>
      <div v-if="slots.content">
        <SvgDownArrow :class="{ 'rotate-180': isOpened }" />
      </div>
    </div>
    <div v-if="slots.content" v-show="isOpened" class="mt-3">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpened = defineModel<boolean>()
const slots = useSlots()
</script>
