<template>
  <Button class="rounded-full" @click="codePanelOpened = true">
    <div class="flex font-medium leading-[28px]">
      <Icon name="code" size="28px" />
      <TransitionExpand axis="x">
        <div v-if="opened" class="whitespace-nowrap ml-2">Zadaj kód</div>
      </TransitionExpand>
    </div>
  </Button>
</template>

<script setup lang="ts">
import { TransitionExpand } from '@morev/vue-transitions'
// TODO: translate btn label, hide text after some time
defineProps<{
  opened: boolean
}>()

const { codePanelOpened } = toRefs(useInteractionStore())
</script>

<style scoped lang="scss">

</style>
