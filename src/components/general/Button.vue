<template>
  <button
    type="button"
    class="button leading-7 rounded-xl p-3 flex items-center grow transition-all ease-in-out duration-300 border-2 disabled:cursor-not-allowed"
    :class="className"
  >
    <slot name="prefix"><Icon v-if="icon" :name="icon" :class="{ 'mr-2': !isIconOnly }" /></slot>
    <div class="text-lg font-[500]">
      <slot>{{ label }}</slot>
    </div>
    <slot name="suffix"></slot>
  </button>
</template>

<script setup lang="ts">
import Icon from '@/components/general/Icon.vue'

const props = withDefaults(
  defineProps<{
    icon?: string
    variant?: 'primary' | 'outline'
    color?: 'default' | 'black' | 'red'
    label?: string
  }>(),
  {
    variant: 'primary',
    color: 'default',
  }
)

const className = computed(() => {
  const classes = []
  props.variant && classes.push(`variant-${props.variant}`)
  props.color && classes.push(`color-${props.color}`)

  return classes
})

const slots = useSlots()

const isIconOnly = computed(() => {
  return !slots.default && props.icon && !props.label
})
</script>

<style scoped lang="scss">
.button {
  --color: theme('colors.blue.DEFAULT');
  --color-active: theme('colors.blue.dark');
  --color-disabled: theme('colors.blue.softest');
  --text-color: theme('colors.white');
  --text-color-disabled: theme('colors.black.soft');

  border-color: var(--color);
  background: var(--color);
  color: var(--text-color);

  &.color-black {
    --color: theme('colors.black.DEFAULT');
    --color-active: theme('colors.black.soft');
    --color-disabled: theme('colors.black.softest');
    --text-color: theme('colors.white');
    --text-color-disabled: theme('colors.black.soft');
  }

  &.color-red {
    --color: theme('colors.red');
    --color-active: theme('colors.red');
    --color-disabled: theme('colors.red');
    --text-color: theme('colors.white');
    --text-color-disabled: theme('colors.red');
  }

  &:active {
    background: var(--color-active);
    border-color: var(--color-active);
  }

  &:disabled {
    background: var(--color-disabled);
    border-color: transparent;
    color: var(--text-color-disabled);
  }

  &.variant-outline {
    background: transparent;
    border-color: var(--color);
    color: var(--color);

    &:active {
      border-color: var(--color-active);
      color: var(--color-active);
      background-color: var(--color-disabled);
    }

    &:disabled {
      background: transparent;
      border-color: var(--color-disabled);
      color: var(--text-color-disabled);
    }
  }
}
</style>
