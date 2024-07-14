<script setup lang="ts">
import SearchShows from "@/components/ShowsSearch/ShowsSearch.vue";
</script>

<template>
    <div
        class="home-view-heading flex items-center w-full h-24 px-12 bg-green-700 sticky top-0 z-[999999]"
    >
        <div class="w-[25%] mr-auto text-white text-2xl font-semibold tracking-widest drop-shadow-xl">
            <!-- @TODO: add the title and change the title of the app  -->
            TV Shows And Series
        </div>
        <div class="w-[15%] max-w-[20rem] ml-auto">
            <SearchShows/>
        </div>
    </div>
</template>