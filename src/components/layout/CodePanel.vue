<template>
  <div
    class="fixed z-10 bottom-0 overflow-hidden w-full bg-white ease-in-out rounded-t-xl md:mx-auto md:max-w-lg duration-500"
    :class="[!codePanelOpened ? 'translate-y-full' : 'translate-y-0']"
  >
    <div
      class="flex w-full items-center overflow-hidden border-2 border-b-0 px-4 py-2 rounded-t-xl"
    >
      <div class="text-2xl font-medium grow">{{ $t('Enter object code') }}</div>
      <Icon name="close" class="cursor-pointer" @click="codePanelOpened = false" />
    </div>

    <div class="grid grid-cols-3 content-center gap-[2px] border-2 border-black bg-black">
      <CircleButton
        v-for="position in code.length"
        :key="position"
        class="border-0 bg-white"
        :is-checked="!!code[position - 1]"
        @touchstart.prevent="onSetCode(position - 1, $event)"
        @touchend.prevent
        @click="onSetCode(position - 1, $event)"
      />
    </div>

    <div class="p-3 border-2 border-t-0">
      <Button
        class="w-full justify-center"
        :disabled="!active"
        :label="wrong ? $t('Try again') : $t('Check the code')"
        :color="wrong ? 'red' : 'default'"
        @mousedown="onVerifyCode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import CircleButton from '@/components/forms/CircleButton.vue'

const emit = defineEmits<{
  close: []
}>()

const { codePanelOpened } = toRefs(useInteractionStore())
const router = useRouter()
const route = useRoute()
const code = reactive(Array(9).fill(0))
const wrong = ref(false)

const active = computed(() => {
  return isBusy.value || code.some((bit) => bit)
})

const isBusy = ref(false)

const onSetCode = (position: number, $event: any) => {
  code[position] = (code[position] + 1) % 2
}

const onVerifyCode = () => {
  isBusy.value = true

  const digit = parseInt(code.join(''), 2)

  axios
    .get('/api/verify/' + digit)
    .then(({ data }) => {
      const id = data.data.codeable_id
      switch (data.data.codeable_type) {
        case 'item':
          router.push(`/item/${id}`)
          reset()
          break
        case 'section':
          router.push(`/section/${id}`)
          reset()
          break
        case 'place':
          router.push(`/place/${id}`)
          reset()
          break
      }
    })
    .catch(() => {
      wrong.value = true
    })
    .finally(() => {
      isBusy.value = false
    })
}

function reset() {
  code.fill(0)
  wrong.value = false
  codePanelOpened.value = false
  emit('close')
}

watch(code, () => {
  wrong.value = false
})

onMounted(() => {
  if (route.hash === '#code') {
    router.replace({ hash: undefined })
  }
})
</script>
