<template>
  <slot v-if="item" :item="item"></slot>
</template>

<script setup lang="ts">
import Item from '@/models/Item'

const props = defineProps<{
  id: string
}>()

const item = ref<Item | null>(null)

onMounted(async () => {
  const itemStore = useItemStore()
  // TODO: remove this
  // await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500))
  item.value = itemStore.get(props.id) || (await itemStore.load(props.id))
})
</script>
