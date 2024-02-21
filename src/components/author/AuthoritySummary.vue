<template>
  <div class="flex">
    <div class="shrink-0">
      <img class="rounded-full w-20" :src="authority.image_url" />
    </div>
    <div class="mx-3 self-center">
      <div class="font-bold text-lg leading-[26px]">{{ authority.name }}</div>
      <div>
        {{ authority.birth_date }} {{ authority.birth_place }}
        <template v-if="authority.death_date">
          &mdash; {{ authority.death_date }} {{ authority.death_place }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Authority from '@/models/Authority'

defineProps<{
  authority: Authority
}>()
</script>
