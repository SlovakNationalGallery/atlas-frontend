<template>
  <InteractionItem
    :icon="SvgHeartSmall"
    icon-class="fill-current"
    :label="$t('Saved')"
    v-bind="props"
    item=""
  />
</template>

<script setup lang="ts">
import SvgHeartSmall from '@/components/svg/SvgHeartSmall.vue'
import InteractionItem from '@/components/interactions/InteractionItem.vue'

const props = defineProps<{
  item: any //TODO: add model
}>()
</script>
