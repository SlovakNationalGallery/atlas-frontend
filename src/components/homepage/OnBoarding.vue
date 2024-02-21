<template>
  <div class="py-6 px-4 gap-6 flex flex-col">
    <div class="flex items-center">
      <h2 class="grow text-xl font-bold leading-7">Jazyk / Language</h2>
      <LanguageSwitcher />
    </div>
    <div>
      <Button class="w-full justify-center" @click="emit('close')">{{
        $t('Continue to Atlas')
      }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'

const emit = defineEmits<{
  close: []
}>()
</script>
