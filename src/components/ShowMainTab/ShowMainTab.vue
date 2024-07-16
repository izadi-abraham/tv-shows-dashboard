<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";
import { computed } from "vue";


const currentShowStore = useCurrentShowStore()
const properties = ['Status', 'Ended', 'Premiered', 'Language']


// Watcher
const genres = computed(() => {
    return currentShowStore.getCurrentShow.genres ? currentShowStore.getCurrentShow.genres.join(', ') : '-';
})

const imdbLink = computed(() => {
    return currentShowStore.getCurrentShow.externals?.imdb ? `https://www.imdb.com/title/${currentShowStore.getCurrentShow.externals?.imdb}` : '-';
})

const networkCountry = computed(() => {
    return currentShowStore.getCurrentShow.network?.country.name ? currentShowStore.getCurrentShow.network?.country.name : '-';
})


</script>

<template>
    <div
        class="show-main-tab-component tracking-widest"
    >
        <div
            class="grid grid-cols-2 gap-2 border-b-2 border-white p-2 bg-gray-100"
        >
            <div class="font-semibold"> Genres </div>
            <div> {{ genres }} </div>
        </div>
        <div
            v-for="(property, key) in properties"
            v-bind:key
            :class="`grid grid-cols-2 gap-2 border-b-2 border-white p-2 bg-gray-100 grid-rows-${properties.length} `"
        >
            <div class="font-semibold"> {{ property }} </div>
            <div class="text-justify"> {{ currentShowStore.getCurrentShow[property.toLowerCase()] }} </div>
        </div>
        <div
            class="grid grid-cols-2 gap-2 border-b-2 border-white p-2 bg-gray-100 truncate"
        >
            <div class="font-semibold"> IMDB Link </div>
            <a :href="imdbLink" target="_blank" class="text-gray-800 underline decoration-1 decoration-gray-800 underline-offset-[.3rem] hover:text-gray-400 hover:decoration-gray-400 hover:bg-transparent text-justify"> {{ imdbLink }} </a>
        </div>
        <div
            class="grid grid-cols-2 gap-2 border-b-2 border-white p-2 bg-gray-100"
        >
            <div class="font-semibold"> Network Country </div>
            <div> {{ networkCountry }} </div>
        </div>
        <div
            class="grid grid-cols-2 gap-2 border-b-2 border-white p-2 bg-gray-100"
        >
            <div class="font-semibold"> Average Runtime </div>
            <div> {{ currentShowStore.getCurrentShow.averageRuntime ?? '-' }} </div>
        </div>
    </div>
</template>