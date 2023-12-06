<template>
  <div class="relative box-content flex h-24 overflow-hidden rounded-xl" :style="style">
    <div class="w-24 flex-none">
      <slot name="image"></slot>
    </div>
    <div class="min-w-0 grow px-3 flex flex-col justify-center">
      <div class="flex items-center">
        <h2 class="mr-2 grow text-lg font-medium leading-6 line-clamp-2">
          <slot name="title"></slot>
        </h2>
        <Icon v-if="props.icon" :name="props.icon" class="min-w-[32px]" />
      </div>
      <div
        class="text-sm pr-6"
        :class="{
          'truncate': truncateDescription,
          'line-clamp-2': !truncateDescription,
          'pr-6': !props.icon,
        }"
      >
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
