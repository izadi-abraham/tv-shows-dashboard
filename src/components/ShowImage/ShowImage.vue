<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";


const currentShowStore = useCurrentShowStore()

</script>

<template>
    <div
        class="max-w-64 pt-8"
        :title="currentShowStore.currentShow.name"
    >
        <img :src="`${currentShowStore.currentShow.image?.original}`" :alt="`${currentShowStore.currentShow.name} show image`">
    </div>
</template>