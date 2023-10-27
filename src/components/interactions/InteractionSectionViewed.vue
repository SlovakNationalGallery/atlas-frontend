<template>
    <div class="flex opacity-60 text-gray-softest" v-if="section">
        <div class="flex-none mr-2">
            <SvgEye />
        </div>
        <span>
            {{ $t('Viewed') }}
            <router-link
                class="underline hover:no-underline"
                :to="`/section/${section.id}`"
                >{{ section.title }}</router-link
            >
        </span>
    </div>
</template>

<script setup>

const props = defineProps(['section'])
</script>
