<template>
    <div class="sticky top-0 z-20 flex w-full items-center whitespace-nowrap border-y-2 border-black bg-white">
        <HistoryBack v-slot="{ back }">
            <button
                @click="isFrontpage ? (isOpenedAbout = !isOpenedAbout) : back()"
                class="border-r-2"
                :class="[isFrontpage ? 'border-r-black bg-green p-2' : 'flex-1 border-r-transparent p-3']"
            >
                <SvgBack v-if="route.path !== '/'" />
                <SvgClose v-else-if="isOpenedAbout" />
                <SvgLogo v-else />
            </button>
        </HistoryBack>
        <h1 class="grow px-2.5 text-1.5xl font-medium" :class="{ 'text-center': !isFrontpage }" id="title">
            {{ $t(isOpenedAbout ? 'About the App' : route.meta.title ?? '') }}
            <span v-if="isMyCollection">({{ interactionStore.viewedItemsCount }})</span>
        </h1>
        <div class="flex-1 border-l-2 border-transparent px-3 text-right" v-if="isMyCollection">
            <!-- <button class="rounded-xl bg-green px-3 py-1 text-sm font-bold" @click="scroll('share')">
                {{ $t('Share') }}
            </button> -->
        </div>
        <LanguageSwitcher v-else-if="isFrontpage" />
        <ViewedItemsCount v-else class="flex-1 border-l-2 border-l-transparent px-4 py-2" :show-tooltip="isActive" />
    </div>

    <About :opened="isOpenedAbout" />
</template>

<script setup>
import About from '../about/About.vue'
import HistoryBack from '../misc/HistoryBack.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ViewedItemsCount from '../misc/ViewedItemsCount.vue'

const route = useRoute()
const interactionStore = useInteractionStore()

const isOpenedAbout = ref(false)
const isActive = ref(false)

const title = computed(() => route.meta.title ?? 'Atlas SNG')

const isFrontpage = computed(() => route.path === '/')
const isMyCollection = computed(() => route.path === '/collection')

const displayTooltip = () => {
    isActive.value = true
    setTimeout(() => {
        isActive.value = false
    }, 3000)
}



const scroll = (id) => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
    })
}

interactionStore.$onAction(({ name }) => {
    if (name === 'addItemViewed' && !interactionStore.viewedItemsCount) {
        displayTooltip()
    }
})
</script>
