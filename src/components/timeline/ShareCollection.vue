<template>
  <div class="flex items-center rounded-xl bg-green/20 p-2">
    <SvgLinkSimple class="mx-2 stroke-current" />
    <div ref="urlRef" class="grow font-medium">{{ loading ? $t('Loading...') : url }}</div>
    <button
      type="button"
      :disabled="loading"
      class="flex-none rounded-lg bg-green px-3 py-1 font-bold"
      @click="share"
    >
      {{ $t(buttonText) }}
    </button>
  </div>
</template>

<script setup lang="ts">
const itemStore = useItemStore()
const loading = ref(true)
const url = ref(null)
const urlRef = ref<HTMLDivElement | null>(null)
const buttonText = ref('Share')

onMounted(async () => {
  url.value = await itemStore.getCollectionLink()
  loading.value = false
})

const share = () => {
  if (navigator.share && url.value) {
    navigator.share({
      // TODO: translation
      title: 'Moja kolekcia · ' + document.title,
      // text: url.value,
      url: url.value,
    })
  } else {
    urlRef.value &&
      navigator.clipboard.writeText(urlRef.value.textContent || '').then(
        () => {
          buttonText.value = 'Link copied'
          setTimeout(() => {
            buttonText.value = 'Share'
          }, 2000)
        },
        () => {
          window.open(url.value || '', '_blank')?.focus()
        }
      )
  }
}
</script>
