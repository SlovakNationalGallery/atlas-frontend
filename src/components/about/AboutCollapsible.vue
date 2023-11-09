<template>
  <div ref="el">
    <div class="flex cursor-pointer p-4 text-xl" @click="open = !open">
      <div class="grow">
        <slot name="summary"></slot>
      </div>
      <SvgDownArrow :class="{ 'rotate-180': open }" />
    </div>
    <div v-show="open" class="px-4 pb-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    initialOpen?: boolean
  }>(),
  {
    initialOpen: false,
  }
)

const el = ref<HTMLDivElement | null>(null)
const open = ref(props.initialOpen)

watch(open, (value) => {
  if (value) {
    nextTick(() => {
      el.value?.scrollIntoView({
        behavior: 'smooth',
      })
    })
  }
})
</script>
