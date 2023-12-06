<template>
  <Card v-if="bucketlist" label="Pátračka" icon="scavenger">
    <div class="text-lg">Nájdi diela v areáli SNG, odhaľ čo ich spája a získaj zľavu!</div>

    <Carousel class="-mx-4 my-4">
      <div v-for="col in itemsSorted" :key="col.item.id" class="ml-4">
        <router-link :to="col.locked ? col.item.lockedLink : col.item.link">
          <ItemImage
            :data="col.item"
            class="rounded-lg overflow-hidden"
            :class="{ grayscale: col.locked }"
          />
        </router-link>
      </div>
    </Carousel>
    <div class="flex items-center">
      <h2 class="text-lg font-medium grow">{{ $t('Scavenger hunt:') }} {{ bucketlist.title }}</h2>
      <div>{{ found.length }}/{{ bucketlist.items.length }} nájdených</div>
    </div>

    <div class="border-2 h-3 rounded-xl mb-4 mt-2">
      <div class="h-full bg-black transition-all" :style="{ width }"></div>
    </div>

    <router-link :to="bucketlist.link">
      <Button label="Otvor pátračku" w-full center />
    </router-link>
  </Card>
</template>

<script setup lang="ts">
import Carousel from '@/components/misc/Carousel.vue'
import ItemImage from '@/components/item/ItemImage.vue'
import Bucketlist from '@/models/Bucketlist'

const props = defineProps<{
  id: string
}>()

const bucketlistStore = useBucketlistStore()
const itemsStore = useItemStore()
const bucketlist = ref<Bucketlist | null>(null)

const found = computed(() => {
  return bucketlist.value?.items.filter((item) => itemsStore.isItemViewed(item.id)) ?? []
})

const notFound = computed(() => {
  return bucketlist.value?.items.filter((item) => !itemsStore.isItemViewed(item.id)) ?? []
})

const itemsSorted = computed(() => {
  return [
    ...found.value.map((item) => ({ item, locked: false })),
    ...notFound.value.map((item) => ({ item, locked: true })),
  ]
})

const width = computed(
  () => (found.value.length / (bucketlist.value?.items.length ?? 1)) * 100 + '%'
)

onMounted(async () => {
  bucketlist.value = bucketlistStore.get(props.id)!
  bucketlist.value = await bucketlistStore.load(props.id)
})
</script>
