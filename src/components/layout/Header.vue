<template>
  <div
    class="sticky top-0 z-20 flex w-full items-center whitespace-nowrap border-y-2 border-black bg-white"
  >
    <HistoryBack v-slot="{ back }">
      <button
        type="button"
        class="border-r-2"
        :class="[isFrontpage ? 'border-r-black bg-green p-2' : 'flex-1 border-r-transparent p-3']"
        @click="isFrontpage ? (isOpenedAbout = !isOpenedAbout) : back()"
      >
        <SvgBack v-if="route.path !== '/'" />
        <SvgClose v-else-if="isOpenedAbout" />
        <SvgLogo v-else />
      </button>
    </HistoryBack>
    <h1
      id="title"
      class="grow px-2.5 text-1.5xl font-medium"
      :class="{ 'text-center': !isFrontpage }"
    >
      {{ $t(isOpenedAbout ? 'About the App' : title) }}
      <span v-if="isMyCollection">({{ itemStore.viewedItemsCount }})</span>
    </h1>
    <div v-if="isMyCollection" class="flex-1 border-l-2 border-transparent px-3 text-right">
      <!-- <button class="rounded-xl bg-green px-3 py-1 text-sm font-bold" @click="scroll('share')">
                {{ $t('Share') }}
            </button> -->
    </div>
    <LanguageSwitcher v-else-if="isFrontpage" />
    <ViewedItemsCount
      v-else
      class="flex-1 border-l-2 border-l-transparent px-4 py-2"
      :show-tooltip="isActive"
    />
  </div>

  <About :opened="isOpenedAbout" />
</template>

<script setup lang="ts">
import ViewedItemsCount from '@/components/misc/ViewedItemsCount.vue'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import About from '@/components/about/About.vue'
import HistoryBack from '@/components/misc/HistoryBack.vue'

const route = useRoute()
const itemStore = useItemStore()

const isOpenedAbout = ref(false)
const isActive = ref(false)

const title = computed(() => (route.meta.title as string) ?? 'Atlas SNG')

const isFrontpage = computed(() => route.path === '/')
const isMyCollection = computed(() => route.path === '/collection')

const displayTooltip = () => {
  isActive.value = true
  setTimeout(() => {
    isActive.value = false
  }, 3000)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const scroll = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
  })
}

itemStore.$onAction(({ name }) => {
  if (name === 'addItemViewed' && !itemStore.viewedItemsCount) {
    displayTooltip()
  }
})
</script>
