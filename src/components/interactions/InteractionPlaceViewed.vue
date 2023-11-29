<template>
  <div v-if="place" class="flex text-gray-softest opacity-60">
    <div class="mr-2 flex-none">
      <SvgEye />
    </div>
    <span>
      {{ $t('Viewed') }}
      <router-link class="underline hover:no-underline" :to="place.link">{{
        place.title
      }}</router-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import Place from '@/models/Place'

defineProps<{
  place: Place
}>()
</script>
