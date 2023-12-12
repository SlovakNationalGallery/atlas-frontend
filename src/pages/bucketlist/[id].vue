<template>
  <TransitionFade appear>
    <div v-if="bucketlist">
      <ItemHeader v-if="unlocked" :item="bucketlist" />
      <div v-else class="py-6 px-4 bg-yellow border-b-2">
        <div class="flex items-center gap-2 mb-2">
          <Icon name="scavenger" />
          <div class="text-xl font-bold">{{ $t('Collect artworks and win!') }}</div>
        </div>
        <div class="text-lg mb-6">
          {{
            $t(
              'Artworks in Scavenger hunt share a common motif. Find them all in the gallery and learn more. \n Exploring all the artworks unlocks a text with a code that grants you a 10% discount at the Ex Libris bookstore or a free coffee in the SNG café.'
            )
          }}
        </div>
        <div class="flex items-center">
          <h2 class="text-lg font-medium grow">
            {{ $t('Scavenger hunt:') }} {{ bucketlist.title }}
          </h2>
          <div>
            {{
              $t(':found/:all artworks found!', {
                found: String(found.length),
                all: String(bucketlist.items.length),
              })
            }}
          </div>
        </div>

        <div class="border-2 h-3 rounded-xl mt-2">
          <div class="h-full bg-black transition-all" :style="{ width }"></div>
        </div>
      </div>
      <div class="px-4 pb-24 pt-6">
        <h2 class="text-2xl font-bold">{{ bucketlist.title }}</h2>
        <h3 class="text-lg">{{ $t('Scavenger hunt') }}</h3>

        <div v-if="unlocked" class="bg-yellow p-4 flex flex-col gap-3 rounded-xl my-4">
          <div class="flex items-center gap-2">
            <Icon name="confetti" />
            <div class="text-xl font-bold">{{ $t('Scavenger hunt completed!') }}</div>
          </div>
          <div class="text-lg">
            {{
              $t(
                'Show this code at the Ex Libris bookstore and get 10% discount. In the SNG café you will get a free coffee for the code.'
              )
            }}
          </div>
        </div>

        <div v-if="unlocked" class="my-4 space-y-4 markdown text-lg" v-html="bucketlist.text"></div>
        <div v-else class="my-4 space-y-4 markdown text-lg">
          {{
            $t(
              "Find all the artworks in the list and unlock the text about the Scavenger hunt's current theme."
            )
          }}
        </div>
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

useFetchDetail(async (id) => {
  bucketlist.value = await bucketlistStore.load(id)
})

useDefineTitle(t('Bucketlist'))
</script>
