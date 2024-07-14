<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";


const currentShowStore = useCurrentShowStore()

</script>

<template>
    <div
        class="max-w-64 pt-8"
        :title="currentShowStore.getCurrentShow.name"
    >
        <img :src="`${currentShowStore.getCurrentShow.image?.original}`" :alt="`${currentShowStore.getCurrentShow.name} show image`">
    </div>
</template>