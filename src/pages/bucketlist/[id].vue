<template>
  <TransitionFade appear>
    <div v-if="bucketlist">
      <ItemHeader v-if="unlocked" :item="bucketlist" />
      <div v-else class="py-6 px-4 bg-yellow border-b-2">
        <div class="flex items-center gap-2 mb-2">
          <Icon name="scavenger" />
          <div class="text-xl font-bold">Zbieraj diela a vyhraj!</div>
        </div>
        <div class="text-lg mb-6">
          Umelecké diela v Pátračke niečo spája. Nájdi ich všetky v areáli SNG a dozvieš sa viac. Po
          odomknutí textu uvidíš kód, za ktorý získaš 10% zľavu v kníhkupectve Ex Libris alebo v
          kaviarni SNG.
        </div>
        <div class="flex items-center">
          <h2 class="text-lg font-medium grow">
            {{ $t('Scavenger hunt:') }} {{ bucketlist.title }}
          </h2>
          <div>{{ found.length }}/{{ bucketlist.items.length }} nájdených</div>
        </div>

        <div class="border-2 h-3 rounded-xl mt-2">
          <div class="h-full bg-black transition-all" :style="{ width }"></div>
        </div>
      </div>
      <div class="px-4 pb-24 pt-6">
        <h2 class="text-2xl font-bold">{{ bucketlist.title }}</h2>
        <h3 class="text-lg">Pátračka</h3>

        <div v-if="unlocked" class="bg-yellow p-4 flex flex-col gap-3 rounded-xl my-4">
          <div class="flex items-center gap-2">
            <Icon name="confetti" />
            <div class="text-xl font-bold">Pátračka dokončená!</div>
          </div>
          <div class="text-lg">
            Preukáž sa týmto textom v kníhkupectve Ex Libris alebo v kaviarni Sväg in SNG a získaš
            10% zľavu.
          </div>
        </div>

        <div class="my-4 space-y-4 markdown text-lg" v-html="bucketlist.text"></div>
        <Lists :found="found" :not-found="notFound" />
      </div>
    </div>
  </TransitionFade>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import BucketlistModel from '@/models/Bucketlist'
import ItemHeader from '@/components/item/ItemHeader.vue'
import Lists from '@/components/bucketlist/Lists.vue'

const bucketlistStore = useBucketlistStore()
const itemsStore = useItemStore()
const bucketlist = ref<BucketlistModel | null>(null)

// TODO: move this logic to store?
const found = computed(() => {
  return bucketlist.value?.items.filter((item) => itemsStore.isItemViewed(item.id)) ?? []
})

const notFound = computed(() => {
  return bucketlist.value?.items.filter((item) => !itemsStore.isItemViewed(item.id)) ?? []
})

const width = computed(
  () => (found.value.length / (bucketlist.value?.items.length ?? 1)) * 100 + '%'
)

const unlocked = computed(() => !notFound.value?.length)

definePage({
  meta: {
    title: 'Pátračka',
  },
})

useFetchDetail(async (id) => {
  bucketlist.value = await bucketlistStore.load(id)
})
</script>
