<template>
  <svg aria-hidden="true" :style="{ width: styleSize, height: styleSize }">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang='ts'>
const props = withDefaults(
  defineProps<{
    name: string
    prefix?: string
    color?: string
    size?: string | number
  }>(),
  {
    prefix: 'icon',
    color: 'currentColor',
    size: '32px',
  }
)

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const styleSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size.includes('px') || props.size.includes('rem') ? props.size : `${props.size}px`
})
</script>

