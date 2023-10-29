<template>
  <slot v-if="item" :item="item"></slot>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

const item = ref<any | null>(null) // TODO: add model

onMounted(async () => {
  const itemStore = useItemStore()
  item.value = itemStore.get(props.id) || (await itemStore.load(props.id))
})
</script>
