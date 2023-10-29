<template>
  <InteractionItem :icon="SvgEye" :label="$t('Viewed')" v-bind="props" item="" />
</template>

<script setup lang="ts">
import InteractionItem from '@/components/interactions/InteractionItem.vue'
import SvgEye from '@/components/svg/SvgEye.vue'

const props = defineProps<{
  item: any //TODO: add model
}>()
</script>
