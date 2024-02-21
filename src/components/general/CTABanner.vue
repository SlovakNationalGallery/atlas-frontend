<template>
  <div class="bg-blue-softest rounded-xl py-6 px-4">
    <component :is="link ? 'router-link' : 'div'" :to="link">
      <div class="flex flex-col gap-6 items-center">
        <div
          class="bg-blue-soft w-[64px] rounded-xl text-blue aspect-square flex items-center justify-center"
        >
          <Icon :name="icon ?? 'plus'" />
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold font-sng">{{ title }}</div>
          <div class="mt-2 whitespace-pre-line">{{ description }}</div>
        </div>
        <Button
          v-if="buttonLabel"
          class="w-full justify-center"
          :label="buttonLabel"
          :icon="buttonIcon"
        />
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description: string
  link?: string
  buttonLabel?: string
  buttonIcon?: string
}>()
</script>
