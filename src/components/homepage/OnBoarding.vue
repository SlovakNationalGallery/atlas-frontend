<template>
  <div>
    <Card label="Jazyk / Language">
      <template #actions>
        <LanguageSwitcher />
      </template>
      <Button class="w-full justify-center" @click="emit('close')">{{
        $t('Continue to the app')
      }}</Button>
    </Card>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'

const emit = defineEmits<{
  close: []
}>()
</script>
