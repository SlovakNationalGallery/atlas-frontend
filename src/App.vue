<template>
  <Header />
  <router-view />
  <FAB is-opened class="fixed right-4 bottom-4 z-10" />
  <CodePanel />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import FAB from '@/components/layout/FAB.vue'
import CodePanel from '@/components/layout/CodePanel.vue'

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
