<template>
  <div>
    <Bucketlist :id="bucketlistId" class="border-b-2" />
    <History />
  </div>
</template>

<script setup lang="ts">
import Bucketlist from '@/components/history/Bucketlist.vue'
import History from '@/components/history/History.vue'

const bucketlistId = import.meta.env.VITE_DEFAULT_BUCKETLIST

// TODO: translate
definePage({
  meta: {
    title: 'Moja história',
  },
})
</script>
