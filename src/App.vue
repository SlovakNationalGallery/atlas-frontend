<template>
  <Header />
  <FAB class="fixed right-10 bottom-10" />
  <router-view />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import FAB from '@/components/layout/FAB.vue'

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
