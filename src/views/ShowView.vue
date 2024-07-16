<script setup lang="ts">
import { useRoute } from "vue-router";
import { ShowsListService } from "@/services/showsList";
import ShowViewHeading from "@/components/ShowViewHeading/ShowViewHeading.vue";
import { useCurrentShowStore } from "@/stores/current-show";
import ShowTabs from "@/components/GenericTabs/GenericTabs.vue";
import ShowMainTab from "@/components/ShowMainTab/ShowMainTab.vue";


const route = useRoute()
const service = new ShowsListService()
const currentShowStore = useCurrentShowStore();

const tabNames = ['Main', 'Seasons', 'Cast', 'Crew']


// Methods
const initialize = async () => {
    currentShowStore.setFetching(true);
    await service.getShow(Number(route.params.id));
    currentShowStore.setFetching(false);
    currentShowStore.setEpisodeFetching(true);
    await service.fetchShowSeasons(Number(route.params.id));
    currentShowStore.setEpisodeFetching(false);

};

initialize();

</script>

<template>
    <div
        class="show-view-component h-full w-full"
    >
        <ShowViewHeading/>
        <ShowTabs :tab-names="tabNames">
            <template
                v-slot:main
            >
                <ShowMainTab/>
            </template>
            <template
                v-slot:seasons
            >
                <div class="flex justify-center items-center p-16 text-xl text-purple-700 font-semibold">Seasons ...</div>
            </template>
            <template
                v-slot:cast
            >
                <div class="flex justify-center items-center p-16 text-xl text-orange-500 font-semibold">Cast ...</div>
            </template>
            <template
                v-slot:crew
            >
                <div class="flex justify-center items-center p-16 text-xl text-fuchsia-500 font-semibold">Crew ...</div>
            </template>
        </ShowTabs>
    </div>
</template>
