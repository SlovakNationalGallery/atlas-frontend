<template>
  <button
    type="button"
    class="button leading-7 rounded-[12px] p-3 flex items-center grow"
    :class="className"
  >
    <slot name="prefix"><Icon v-if="icon" :name="icon" class="mr-[8px]" /></slot>
    <div class="text-lg">
      <slot>{{ label }}</slot>
    </div>
    <slot name="suffix"></slot>
  </button>
</template>

<script setup lang="ts">
import Icon from '@/components/general/Icon.vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline'
    icon?: string
    color?: string
    label?: string
    center?: boolean
    disabled?: boolean
    wFull?: boolean
  }>(),
  {
    variant: 'primary',
  }
)

const className = computed(() => {
  const classes = []
  props.variant && classes.push(`variant-${props.variant}`)
  props.center && classes.push('justify-center')
  props.disabled && classes.push('disabled cursor-not-allowed')
  props.wFull && classes.push('w-full')
  props.color && classes.push(`color-${props.color}`)

  return classes
})
</script>

<style scoped lang="scss">
.button {
  --color: var(--blue);
  --color-hover: var(--blue-hover);
  --color-disabled: var(--15-blue);
  --text-color: var(--white);
  --text-color-disabled: var(--50-black);

  border: 2px solid var(--color);
  background: var(--color);
  color: var(--text-color);

  transition: all 0.2s ease-in-out;

  &.color-black {
    --color: var(--black);
    --color-hover: var(--50-black);
    --color-disabled: var(--15-black);
    --text-color: var(--white);
    --text-color-disabled: var(--50-black);
  }

  &:hover {
    background: var(--color-hover);
    border-color: var(--color-hover);
  }

  &.disabled {
    background: var(--color-disabled);
    border-color: transparent;
    color: var(--text-color-disabled);
  }

  &.variant-outline {
    background: transparent;
    border-color: var(--color);
    color: var(--color);

    &:hover {
      border-color: var(--color-hover);
      color: var(--color-hover);
    }

    &.disabled {
      background: transparent;
      border-color: var(--color-disabled);
      color: var(--text-color-disabled);
    }
  }
}
</style>
