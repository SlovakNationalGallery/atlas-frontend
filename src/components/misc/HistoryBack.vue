<template>
  <slot :back="back"></slot>
</template>

<script setup lang="ts">
const router = useRouter()
const { history } = toRefs(useHistoryStore())

const back = () => {
  if (history.value?.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
