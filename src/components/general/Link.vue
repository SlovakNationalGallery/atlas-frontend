<template>
  <div
    type="button"
    class="link text-left cursor-pointer rounded-lg flex flex-col p-3 gap-3"
    @click="openLink"
  >
    <div class="flex grow w-full">
      <div class="grow">
        <Icon v-if="icon" :name="icon" />
      </div>
      <Icon v-if="external" class="accent" name="external" size="24px" />
    </div>
    <div>
      <div class="text-xl font-bold">{{ title }}</div>
      <div v-if="description" class="text accent">{{ description }}</div>
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

<style scoped lang="scss">
.link {
  --bg-color: var(--15-blue);
  --accent-color: var(--blue);

  background-color: var(--bg-color);
  .accent {
    color: var(--accent-color);
  }
}
</style>
