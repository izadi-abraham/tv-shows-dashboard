<script setup lang="ts">
import SearchShows from "@/components/ShowsSearch/SearchShows.vue";
import SortShows from "@/components/ShowsSort/SortShows.vue";
</script>

<template>
    <div
        class="home-view-heading flex items-center w-full h-24 px-8 bg-green-600 sticky top-0 z-[999999]"
    >
        <div class="w-[15%] max-w-[20rem] mr-auto">
            <SortShows/>
        </div>
        <div class="w-[15%] max-w-[20rem] ml-auto">
            <SearchShows/>
        </div>
    </div>
</template>