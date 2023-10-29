<template>
  <InteractionItem
    :icon="SvgHeartSmall"
    icon-class="fill-current"
    :label="$t('Saved')"
    v-bind="props"
  />
</template>

<script setup lang="ts">
import SvgHeartSmall from '@/components/svg/SvgHeartSmall.vue'
import InteractionItem from '@/components/interactions/InteractionItem.vue'
import Item from '@/models/Item'

const props = defineProps<{
  item: Item
}>()
</script>
