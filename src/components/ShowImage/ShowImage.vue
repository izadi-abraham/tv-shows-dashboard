<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";


const currentShowStore = useCurrentShowStore()

</script>

<template>
    <div
        class="max-w-64 pt-8"
        :title="currentShowStore.getCurrentShow.name"
    >
        <img
            v-if="currentShowStore.getCurrentShow.image?.original"
            :src="`${currentShowStore.getCurrentShow.image?.original}`"
            :alt="`${currentShowStore.getCurrentShow.name} show image`"
        >
        <div
            v-else
            class="w-50 flex justify-center items-center h-[16.8rem] bg-gray-100"
        >
            No image
        </div>
    </div>
</template>