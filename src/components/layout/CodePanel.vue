<template>
  <div
    class="fixed z-10 top-full overflow-hidden w-full bg-white ease-in-out rounded-t-xl md:mx-auto md:max-w-lg duration-500"
    :class="[codePanelOpened ? '-translate-y-full' : 'translate-y-0']"
  >
    <div
      class="flex w-full items-center overflow-hidden border-2 border-b-0 px-4 py-2 rounded-t-xl"
    >
      <div class="text-2xl font-medium grow">Zadaj kód objektu</div>
      <Icon name="close" class="cursor-pointer" @click="codePanelOpened = false" />
    </div>

    <div class="grid grid-cols-3 content-center gap-[2px] border-2 border-black bg-black">
      <CircleButton
        v-for="position in code.length"
        :key="position"
        class="border-0 bg-white"
        :is-checked="!!code[position - 1]"
        @click="code[position - 1] = (code[position - 1] + 1) % 2"
      />
    </div>

    <div class="p-3 border-2 border-t-0">
      <Button
        icon="chat"
        w-full
        center
        :disabled="!active"
        :label="$t(wrong ? 'Try again' : 'Check the code')"
        @click="verifyCode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import CircleButton from '@/components/forms/CircleButton.vue'

const { codePanelOpened } = toRefs(useInteractionStore())
const router = useRouter()
const route = useRoute()
const code = reactive(Array(9).fill(0))
const wrong = ref(false)

const active = computed(() => {
  return code.some((bit) => bit)
})

const verifyCode = () => {
  const digit = parseInt(code.join(''), 2)
  axios
    .get('/api/verify/' + digit)
    .then(({ data }) => {
      const id = data.data.codeable_id
      switch (data.data.codeable_type) {
        case 'item':
          router.push(`/item/${id}`)
          break
        case 'section':
          router.push(`/section/${id}`)
          break
        case 'place':
          router.push(`/place/${id}`)
          break
      }
    })
    .catch(() => {
      wrong.value = true
    })
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
