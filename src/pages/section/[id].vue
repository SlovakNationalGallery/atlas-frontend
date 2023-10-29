<template>
  <div v-if="section" class="relative w-full border-b-2 border-black bg-gray-softest">
    <ItemImage
      v-if="section.image"
      :alt="section.title"
      :src="section.image.src"
      :srcset="section.image.srcset"
    />
    <!-- Add space if section image is missing -->
    <div v-else class="h-12 w-full" />
  </div>

  <div v-if="section" class="relative h-full border-black px-4 pb-24 pt-8">
    <div v-if="section.code" class="absolute -top-8 inline-block rounded-md bg-black p-1.5">
      <img class="h-9 w-9" :src="codeImage" :alt="section.code" />
    </div>
    <h3 class="text-lg font-bold text-gray-dark">
      {{ $t('Group of :count artworks', { count: String(section.items.length) }) }}
    </h3>
    <h2 class="text-1.5xl font-bold">{{ section.title }}</h2>
    <div v-if="section.location_formatted" class="text-lg text-gray-dark">
      {{ $t('Location') }}: {{ section.location_formatted }}
    </div>
    <div class="my-4 space-y-4 markdown" v-html="section.description"></div>
    <p class="mb-2 font-bold">{{ $t('More about artworks in the group') }}</p>
    <div class="flex flex-col space-y-3">
      <router-link v-for="item in section.items" :key="item.id" :to="`/section/${id}/${item.id}`">
        <ItemThumbnail :item="item" />
      </router-link>
    </div>
  </div>
  <div
    class="pointer-events-none fixed bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent md:max-w-lg"
  >
    <div class="pointer-events-auto p-4 pt-8">
      <HistoryBack v-slot="{ back }">
        <ConfirmButton class="group bg-white" @click="back">
          <SvgBack class="mr-2 group-active:stroke-white" />
          {{ $t('Back') }}
        </ConfirmButton>
      </HistoryBack>
    </div>
  </div>
</template>

<script setup lang="ts">
import HistoryBack from '@/components/misc/HistoryBack.vue'
import ConfirmButton from '@/components/forms/ConfirmButton.vue'
import ItemThumbnail from '@/components/general/ItemThumbnail.vue'
import ItemImage from '@/components/general/ItemImage.vue'
import Section from '@/models/Section'

// const interactionStore = useInteractionStore()
const sectionStore = useSectionStore()

const section = ref<Section | null>(null)

const { id } = useParams()

onMounted(async () => {
  section.value = await sectionStore.load(id)

  // TODO: where did item come from?
  // interactionStore.addSectionViewed(item.value.id)
})

const codeImage = computed(() => {
  return `${import.meta.env.VITE_API_URL}/img/${section.value?.code}.svg`
})
</script>
