<template>
    <slot v-if="item" :item="item"></slot>
</template>

<script setup>

const props = defineProps(['id'])
const item = ref(null)

onMounted(async () => {
    const itemStore = useItemStore()
    item.value = itemStore.get(props.id) || (await itemStore.load(props.id))
})
</script>
