<script setup lang="ts">

interface Props {
    imageUrl: string,
    name: string,
    genres: string[]
}

const props = defineProps<Props>();

</script>

<template>
    <div
        class="p-2 m-4 w-48 h-80 border border-1 border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110"
        :title="props.name"
    >
        <img :src="props.imageUrl" alt="image description" />
        <div class="w-[95%] pl-[.1rem]">
            <div
                class="font-medium mt-2 truncate"
            >
                {{ props.name }}
            </div>
            <div
                class="font-bold text-xs mt-[.1rem] truncate"
            >
                {{ props.genres?.join(' / ') }}
            </div>
        </div>
    </div>
</template>