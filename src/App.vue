<template>
  <Header />
  <FAB :opened="showFABText" class="fixed right-10 bottom-10" />
  <router-view />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import FAB from '@/components/layout/FAB.vue'

// TODO: this is just a temporary solution
// move this to a FAB component, after discussion with the client
// also codepanel is not present on every page
const showFABText = ref(true)
onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  showFABText.value = false
})

const setViewHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(async () => {
  setViewHeight()
  window.addEventListener('resize', () => {
    setViewHeight()
  })
})
</script>
