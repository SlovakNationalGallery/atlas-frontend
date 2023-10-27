<template>
    <div>
        <Bucketlist :id="bucketlistId" v-if="bucketlistId" class="px-4 py-6" />
        <hr class="border border-gray-soft" />
        <Timeline />
    </div>
</template>

<script setup>
import Bucketlist from '~/components/bucketlist/Bucketlist.vue'
import Timeline from '~/components/timeline/Timeline.vue'

// TODO: do we need this if we have /collection?

definePage({
  meta: {
    title: 'My timeline',
  },
})

const route = useRoute()
const itemStore = useItemStore()
const bucketlistId = import.meta.env.VITE_DEFAULT_BUCKETLIST

onMounted(async () => {
    if (route.params.id) {
        itemStore.fetch(route.params.id)
    }
})
</script>
