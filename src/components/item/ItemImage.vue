<template>
  <div :class="{ 'animate-pulse': isLoading }" class="aspect-[4/3] w-full bg-15-blue">
    <TransitionFade appear>
      <img
        v-if="!isLoading"
        :class="{ hidden: isLoading }"
        class="aspect-[4/3] w-full object-cover object-top"
        :style="{ objectPosition: 'center ' + data.offset_top + 'px' }"
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
}>()

const { isLoading } = preloadImage(props.data.image_src)
</script>
