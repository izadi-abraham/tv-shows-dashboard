<script setup lang="ts">
import { useRoute } from "vue-router";
import { ShowsListService } from "@/services/showsList";
import ShowViewHeading from "@/components/ShowViewHeading/ShowViewHeading.vue";
import { useCurrentShowStore } from "@/stores/current-show";


const route = useRoute()
const service = new ShowsListService()
const currentShowStore = useCurrentShowStore();


// Methods
const initialize = async () => {
    currentShowStore.setLoading(true);
    const currentShow = await service.getShow(Number(route.params.id));
    currentShowStore.setCurrentShow(currentShow)
    currentShowStore.setLoading(false);
};

initialize();

// @TODO: It might be better to add a store for the current show to use among all components inside the show view component

</script>

<template>
    <div
        class="show-viewm h-full"
    >

        <!-- ShowViewHeading component -->
        <ShowViewHeading/>

        <!-- information/casting component -->
        <!-- episodes component -->

    </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
