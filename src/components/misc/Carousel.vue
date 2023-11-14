<template>
  <div class="carousel">
    <div v-for="item in items" :key="item.key as string" class="slide">
      <component :is="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const items = computed(() => (slots.default!()[0].children || []) as VNode[])
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .slide {
    scroll-snap-align: start;
    flex: 0 0 auto;
    width: calc(100% / 2.3);
  }

  // TODO: find better solution
  &:after {
    content: '';
    flex: 0 0 auto;
    width: 12px;
  }
}
</style>
