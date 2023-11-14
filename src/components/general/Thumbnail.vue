<template>
  <div class="relative box-content flex h-24 overflow-hidden rounded-xl" :style="style">
    <div class="w-24 flex-none">
      <slot name="image"></slot>
    </div>
    <div class="min-w-0 grow p-3">
      <div class="flex items-center">
        <h2 class="mr-2 grow truncate text-lg font-medium leading-6">
          <slot name="title"></slot>
        </h2>
        <Icon v-if="props.icon" :name="props.icon" :size="24" />
      </div>
      <div class="text-sm" :class="{ truncate: truncateDescription }">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    truncateDescription?: boolean
    icon?: string
    border?: boolean
    bgColor?: string
  }>(),
  {
    truncateDescription: true,
  }
)

const style = computed(() => ({
  ...(props.border && {
    border: '2px solid currentColor',
  }),
  ...(props.bgColor && {
    backgroundColor: props.bgColor?.includes('#') ? props.bgColor : `#${props.bgColor}`,
  }),
}))
</script>
