<script setup lang="ts">

interface Props {
    imageUrl: string,
    name: string,
    genres: string[],
    rating: number | string
}

const props = defineProps<Props>();

</script>

<template>
    <div
        class="show-card-component p-2 m-4 w-52 h-84 border border-1 border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110"
        :title="props.name"
    >
        <img :src="props.imageUrl" alt="show thumbnail image" />
        <div class="w-[95%] pl-[.1rem]">
            <!-- @TODO: add rating component -->
            <div
                class="font-bold mt-2 truncate"
            >
                {{ props.rating }}
            </div><div
                class="font-medium mt-[.1rem] truncate"
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