<template>
  <slot :back="back"></slot>
</template>

<script setup lang="ts">
const router = useRouter()
const historyStore = useHistoryStore()

const back = () => {
  if (historyStore.get().back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
