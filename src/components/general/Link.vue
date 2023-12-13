<template>
  <div
    type="button"
    class="bg-blue-softest text-left cursor-pointer rounded-lg flex flex-col p-3 gap-3"
    @click="openLink"
  >
    <div class="flex grow w-full">
      <div class="grow">
        <Icon v-if="icon" :name="icon" />
      </div>
      <Icon v-if="external" class="text-blue w-6" name="external" />
    </div>
    <div>
      <div class="text-xl font-bold leading-[26px]">{{ title }}</div>
      <div v-if="description" class="text text-blue">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string
  title: string
  description?: string
  icon?: string
  external?: boolean
}>()

const router = useRouter()

const openLink = () => {
  if (props.external) {
    window.open(props.link, '_blank')
  } else {
    router.push(props.link)
  }
}
</script>
