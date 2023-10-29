<template>
  <InteractionItem :icon="SvgEye" :label="$t('Viewed')" v-bind="props" />
</template>

<script setup lang="ts">
import InteractionItem from '@/components/interactions/InteractionItem.vue'
import SvgEye from '@/components/svg/SvgEye.vue'
import Item from '@/models/Item'

const props = defineProps<{
  item: Item
}>()
</script>
