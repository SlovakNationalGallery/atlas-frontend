<template>
  <div>
    <Card label="Language / Jazyk">
      <template #actions>
        <LanguageSwitcher />
      </template>
      <Button class="w-full justify-center" @click="emit('close')">Pokračuj do aplikácie</Button>
    </Card>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'

const emit = defineEmits<{
  close: []
}>()
</script>
