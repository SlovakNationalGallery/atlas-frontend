<template>
    <InteractionItem :icon="SvgHeartSmall" iconClass="fill-current" :label="$t('Saved')" v-bind="props" />
</template>

<script setup>
import InteractionItem from './InteractionItem.vue'

const props = defineProps(['item'])
</script>
