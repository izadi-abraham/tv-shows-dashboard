<script setup lang="ts">
import { ShowsListService } from "@/services/showsList";
import ShowCard from "@/components/ShowCard/ShowCard.vue";
import ShowCardSkeleton from "@/components/ShowCard/ShowCardSkeleton.vue";
import { useRouter } from "vue-router";
import { useShowListStore } from "@/stores/show-list";
import HomeViewHeading from "@/components/HomeViewHeading/HomeViewHeading.vue";
import ShowFilter from "@/components/ShowFilter/ShowFilter.vue";
import { computed } from "vue";


const showListService = new ShowsListService();
const router = useRouter();
const showListStore = useShowListStore()


// Methods
const initialize = async () => {
    showListStore.setFetching(true);
    await showListService.fetchShowsList();
    showListStore.sortShowsByRate()
    showListStore.setFetching(false);
};

const redirectToShowView = (id: number) => {
    router.push( {
        name: 'about',
        params: {
            id
        }
    } )
}

initialize();


// Watchers
const currentShowList = computed(() => {
    if (showListStore.getActiveFilters?.size) {
        return showListStore.getFilteredList
    } else {
        return showListStore.getShowList
    }
})

// TODO: improve show view page
// rating component
// more details about the show
// Accordion component that shows different sections information
// If user opens the accordion then we make the api request for that section

//TODO: category of shows / Implement tab component
// users view lists (preferably horizontal list) of TV shows
// based on different genres (drama, comedy, sports, etc.).
// A TV show dashboard that effectively
// intuitive and user-friendly UI where TV shows are not only grouped by genre
// but also categorizes and displays shows based on their genre.

// TODO: add tests

// TODO: Responsive design (add media queries)

// TODO: add readme.md



//TODO: filtering to be implemented on FE (Done)
// You may notice there is no endpoint in the TVMaze API that cleanly returns shows by genre.
// However, the "Show index" endpoint should contain the data you need

//TODO: sorting the style and look (optional: on 2 criteria) (Done)
// sorted according to their ratings.
// implement the component

//TODO: search component (Optional)
// search based on typing not pressing enter

// TODO: pagination (Optional)
// pagination



</script>

<template>
  <main class="home-view w-full flex flex-wrap justify-center items-center">
      <HomeViewHeading/>
      <!-- filter -->
      <ShowFilter/>

      <div
          v-if="showListStore.isLoading"
          class="loading-wrapper flex flex-wrap justify-center items-center"
      >
          <ShowCardSkeleton
              v-for="(skeleton, key) in Array.from(Array(20).keys())"
              v-bind:key
          />
      </div>
      <div
          v-else
          class="show-cards-wrapper flex flex-wrap justify-center items-center"
      >
          <ShowCard
              v-for="(show, key) in currentShowList" v-bind:key
              :image-url="show.image?.medium"
              :name="show.name"
              :genres="show.genres"
              :rating="show.rating?.average ? Number(show.rating.average) : 'N/A'"
              @click="() => redirectToShowView(show.id)"
          />
      </div>
  </main>
</template>
