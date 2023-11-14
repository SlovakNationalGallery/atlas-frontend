<template>
  <div class="bg-15-blue rounded-xl py-6 px-4">
    <router-link :to="link">
      <div class="flex flex-col gap-6 items-center">
        <div
          class="bg-30-blue w-[64px] rounded-xl text-blue aspect-square flex items-center justify-center"
        >
          <Icon :name="icon" />
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold">{{ title }}</div>
          <div class="mt-2">{{ description }}</div>
        </div>
        <Button v-if="buttonLabel" w-full center :label="buttonLabel" :icon="buttonIcon" />
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  link: string
  buttonLabel?: string
  buttonIcon?: string
}>()
</script>

<style scoped lang="scss">

</style>
