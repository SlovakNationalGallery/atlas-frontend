<template>
    <div class="flex opacity-60 text-gray-softest" v-if="item">
        <div class="flex-none mr-2">
            <component :is="icon" :class="iconClass" />
        </div>
        <span>
            {{ label }}
            <router-link class="underline hover:no-underline" :to="`/item/${item.id}`"
                >{{ item.author }} &mdash; {{ item.title }}</router-link
            >
        </span>
    </div>
</template>

<script setup>
const props = defineProps(['item', 'label', 'icon', 'iconClass'])
</script>
