<template>
  <Card v-if="bucketlist" :label="$t('Scavenger hunt')" icon="scavenger">
    <div v-if="!unlocked" class="text-lg leading-[26px]">
      {{
        $t(
          'Discover artworks within the SNG premises, unveil what connects them, and get a discount!'
        )
      }}
    </div>
    <div v-else class="text-lg">
      {{ $t('All artworks found! Open the Scavenger hunt and claim your reward.') }}
    </div>

    <Carousel class="-mx-4 my-4 pr-4">
      <div v-for="col in itemsSorted" :key="col.item.id" class="ml-4">
        <router-link :to="col.locked ? col.item.lockedLink : col.item.link">
          <ItemImage
            :data="col.item"
            class="rounded-xl overflow-hidden"
            :class="{ grayscale: col.locked }"
          />
        </router-link>
      </div>
    </Carousel>
    <div class="flex items-center">
      <h2 class="font-medium grow">{{ $t('Scavenger hunt:') }} {{ bucketlist.title }}</h2>
      <div class="text-right">
        {{
          $t(':found/:all artworks found!', {
            found: String(found.length),
            all: String(bucketlist.items.length),
          })
        }}
      </div>
    </div>

    <div class="border-2 h-3 rounded-xl mb-4 mt-2">
      <div class="h-full bg-black transition-all" :style="{ width }"></div>
    </div>

    <router-link :to="bucketlist.link">
      <Button
        :label="!unlocked ? $t('Open scavenger hunt') : $t('See reward')"
        class="w-full justify-center"
      />
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

const unlocked = computed(() => {
  return found.value.length === bucketlist.value?.items.length
})

onMounted(async () => {
  bucketlist.value = bucketlistStore.get(props.id)!
  bucketlist.value = await bucketlistStore.load(props.id)
})
</script>
