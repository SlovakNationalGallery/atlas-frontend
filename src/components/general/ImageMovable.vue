<template>
  <ItemImage
    :offset-top="currentOffsetTop"
    :alt="alt"
    :src="src"
    :srcset="srcset"
    class="cursor-move"
    draggable="false"
    @mousemove.stop.prevent="move"
    @mousedown.stop.prevent="moveStart"
  />
  <div
    class="absolute bottom-0 right-0 h-10 w-12 border-1 border-black bg-white px-2 py-1 text-right"
    :class="{ 'bg-red': ratioImg <= 0.75 && offsetTop !== 0 }"
  >
    {{ currentOffsetTop }}
  </div>
</template>

<script setup lang="ts">
import ItemImage from '@/components/general/ItemImage.vue'

const props = defineProps<{
  alt: string
  offsetTop: number
  src: string
  srcset: string
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
  currentOffsetTop.value = props.offsetTop
  startOffsetTop.value = props.offsetTop
  const img = new Image()
  img.src = props.src
  img.onload = function () {
    ratioImg.value = img.height / img.width
  }
})

window.addEventListener('mouseup', moveEnd)
</script>
