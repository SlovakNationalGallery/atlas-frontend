<template>
  <div :class="{ 'animate-pulse': isLoading }" class="aspect-[4/3] w-full bg-blue-softest">
    <TransitionFade appear>
      <img
        v-if="!isLoading"
        :class="{ hidden: isLoading }"
        class="aspect-[4/3] w-full object-cover object-top"
        :style="{ objectPosition: 'center ' + offsetTop + '%' }"
        :alt="data.image_alt"
        sizes="1px"
        onload="window.requestAnimationFrame(function(){if(!(size=getBoundingClientRect().width))return;onload=null;sizes=Math.ceil(size/window.innerWidth*100)+'vw';});"
        :src="data.image_src"
        :srcset="data.image_srcset"
      />
    </TransitionFade>
  </div>
</template>

<script setup lang="ts">
import { TransitionFade } from '@morev/vue-transitions'

import Section from '@/models/Section'
import Place from '@/models/Place'
import Item from '@/models/Item'
import Bucketlist from '@/models/Bucketlist'

const props = defineProps<{
  data: Item | Section | Place | Bucketlist
  offsetTop?: number
}>()

const offsetTop = computed(() => props.offsetTop ?? props.data.offset_top_percent)

const { isLoading } = preloadImage(props.data.image_src)
</script>
