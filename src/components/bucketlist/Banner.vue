<template>
  <article v-if="bucketlist" class="flex justify-between bg-yellow p-4">
    <div>
      <div class="flex items-center">
        <Icon name="scavenger" size="24px" class="mr-1" />
        <h3 class="font-bold">
          {{ $t('Scavenger hunt:') }} <span class="italic">{{ bucketlist.title }}</span>
        </h3>
      </div>
      <p class="mt-1 text-xl font-medium leading-snug">
        {{
          $t(':found/:all artworks found!', {
            found: String(found?.length ?? 0),
            all: String(bucketlist?.items.length ?? 0),
          })
        }}
      </p>
    </div>
    <div class="flex items-center">
      <router-link :to="unlocked ? `/reward/${bucketlist.id}` : '/collection'">
        <Button
          color="black"
          class="capitalize"
          variant="outline"
          :label="$t(unlocked ? 'reward' : 'list')"
      /></router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import Bucketlist from '@/models/Bucketlist'
import Item from '@/models/Item'

const props = defineProps<{
  item: Item
}>()

const interactionStore = useInteractionStore()
const bucketlistStore = useBucketlistStore()
const bucketlist = ref<Bucketlist>()

const found = computed(() =>
  bucketlist.value?.items.filter((item) => interactionStore.isItemViewed(item.id))
)

const unlocked = computed(() => found.value?.length === bucketlist.value?.items.length)

onMounted(async () => {
  const defaultBucketlist = props.item.bucketlists.find(
    (bucketlist) => bucketlist.id === import.meta.env.VITE_DEFAULT_BUCKETLIST
  )

  if (defaultBucketlist) {
    bucketlist.value =
      bucketlistStore.get(defaultBucketlist.id) ||
      (await bucketlistStore.load(defaultBucketlist.id))
  }
})
</script>

<style scoped lang="scss">

</style>
