<template>
  <div>
    <Bucketlist v-if="bucketlistId" :id="bucketlistId" class="px-4 py-6" />
    <hr class="border border-gray-soft" />
    <Timeline />
  </div>
</template>

<script setup lang="ts">
import Bucketlist from '@/components/bucketlist/Bucketlist.vue'
import Timeline from '@/components/timeline/Timeline.vue'

// TODO: do we need this if we have /collection?

// const itemStore = useItemStore()
const bucketlistId = import.meta.env.VITE_DEFAULT_BUCKETLIST

onMounted(async () => {
  const { id } = useParams()

  if (id) {
    // itemStore.fetch(id)
  }
})
</script>
