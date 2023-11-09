<template>
    <InteractionItem :icon="SvgEye" :label="$t('Viewed')" v-bind="props" />
</template>

<script setup>
import InteractionItem from './InteractionItem.vue'

const props = defineProps(['item'])
</script>
