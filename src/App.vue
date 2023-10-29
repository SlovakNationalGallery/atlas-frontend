<template>
  <Header />
  <router-view />
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue'

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
