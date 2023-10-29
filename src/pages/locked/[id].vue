<template>
  <div v-if="item">
    <div class="relative w-full border-b-2 border-black bg-gray-softest">
      <ItemImage
        :alt="`${item.author}: ${item.title}`"
        :src="item.image_src"
        :srcset="item.image_srcset"
        :offset-top="item.offset_top"
        :images="item.images"
        :image-aspect-ratio="item.image_aspect_ratio"
        class="grayscale"
      />
    </div>
    <div class="relative h-full border-black px-4 pb-24 pt-8">
      <h2 class="text-1.5xl font-bold">{{ item.title }}</h2>
      <h3 class="text-lg text-gray-dark">{{ item.author }} · {{ item.dating }}</h3>
      <div v-if="item.location_formatted" class="text-lg text-gray-dark">
        {{ $t('Location') }}: {{ item.location_formatted }}
      </div>
      <div class="my-4 space-y-4 markdown" v-html="item.locked_bucketlist_description"></div>
    </div>
    <CodePanel />
  </div>
</template>

<script setup lang="ts">
import ItemImage from '@/components/general/ItemImage.vue'
import CodePanel from '@/components/layout/CodePanel.vue'
import Item from '@/models/Item'
import Bucketlist from '@/models/Bucketlist'

const bucketlistStore = useBucketlistStore()
const itemStore = useItemStore()

const item = ref<Item | null>(null)
const bucketlist = ref<Bucketlist | null>(null)

onMounted(async () => {
  const { id } = useParams()

  item.value = await itemStore.load(id)
  const defaultBucketlist = item.value.bucketlists.find(
    (bucketlist) => bucketlist.id === import.meta.env.VITE_DEFAULT_BUCKETLIST
  )
  if (defaultBucketlist) {
    bucketlist.value =
      bucketlistStore.get(defaultBucketlist.id) ||
      (await bucketlistStore.load(defaultBucketlist.id))
  }
})
</script>
