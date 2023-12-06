<template>
  <ItemImage
    :data="data"
    class="cursor-move"
    draggable="false"
    :offset-top="currentOffsetTop"
    @mousemove.stop.prevent="move"
    @mousedown.stop.prevent="moveStart"
  />
  <div
    class="absolute bottom-0 right-0 h-10 w-12 border-1 border-black bg-white px-2 py-1 text-right"
    :class="{ 'bg-red': ratioImg <= 0.75 && data.offset_top !== 0 }"
  >
    {{ currentOffsetTop }}
  </div>
</template>

<script setup lang="ts">
import ItemImage from '@/components/item/ItemImage.vue'
import Item from '@/models/Item'
import Section from '@/models/Section'
import Place from '@/models/Place'
import Bucketlist from '@/models/Bucketlist'

const props = defineProps<{
  data: Item | Section | Place | Bucketlist
}>()

const isMoving = ref(false)
const startPosY = ref(0)
const startOffsetTop = ref(0)
const currentOffsetTop = ref(0)
const ratioImg = ref(1)

const move = (event: DragEvent) => {
  if (isMoving.value) {
    currentOffsetTop.value = startOffsetTop.value + (event.pageY - startPosY.value)
  }
}

const moveStart = (event: DragEvent) => {
  isMoving.value = true
  startPosY.value = event.pageY
}

const moveEnd = () => {
  isMoving.value = false
  startOffsetTop.value = currentOffsetTop.value
}

onMounted(async () => {
  currentOffsetTop.value = props.data.offset_top
  startOffsetTop.value = props.data.offset_top

  const img = new Image()

  img.src = props.data.image_src
  img.onload = function () {
    ratioImg.value = img.height / img.width
  }
})

window.addEventListener('mouseup', moveEnd)
</script>
