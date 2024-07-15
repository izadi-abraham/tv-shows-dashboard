<script setup lang="ts">

interface Props {
    imageUrl?: string,
    name: string,
    genres: string[],
    rating: number | string
}

const props = defineProps<Props>();

</script>

<template>
    <div
        class="show-card-component p-2 m-4 w-52 border border-1 border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110"
        :title="props.name"
    >
        <img v-if="props.imageUrl" :src="props.imageUrl" alt="show thumbnail image" />
        <div
            v-else class="w-50 flex justify-center items-center h-[16.8rem] bg-gray-100"
        >
            No image
        </div>
        <div class="w-[95%] pl-[.1rem]">
            <!-- @TODO: add rating component -->
            <!-- @TODO: add skeleton for inside the component, throttle to see the case when list is loaded but not images -->

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