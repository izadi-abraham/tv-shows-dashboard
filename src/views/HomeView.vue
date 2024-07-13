<script setup lang="ts">
import { ShowsListService } from "@/services/showsList";
import { ref, watch } from "vue";
import ShowCard from "@/components/ShowCard/ShowCard.vue";
import ShowCardSkeleton from "@/components/ShowCard/ShowCardSkeleton.vue";
import { useRouter } from "vue-router";
import { useShowListStore } from "@/stores/show-list";
import HomeViewHeading from "@/components/HomeViewHeading/HomeViewHeading.vue";


const showListService = new ShowsListService();
const router = useRouter();
const showListStore = useShowListStore()


const activeFilters = ref<Set<string>>(new Set<string>());


// Methods
const initialize = async () => {
    showListStore.setLoading(true);
    const showList = await showListService.getShowList();
    showListStore.setShowList(showList)
    showListStore.sortShowsByRate()
    showListStore.setLoading(false);
};

const redirectToShowView = (id: number) => {
    router.push( {
        name: 'about',
        params: {
            id
        }
    } )
}

const handleFilter = (event) => {
    const clickedFilter = event.target.innerText;
    console.log('event', clickedFilter)
    activeFilters.value.has(clickedFilter) ? activeFilters.value.delete(clickedFilter) : activeFilters.value.add(clickedFilter);
}


initialize();


// Watchers
watch(() => activeFilters.value.size, (sizeOfActiveFilters) => {

    // @TODO: move filtering to the store
    // @TODO: implement the intersection, subset filter

    if (sizeOfActiveFilters === 0) {
        showListStore.setShowList([...showListService.showsList]);

        return;
    }

    const filteredList = [...showListService.showsList.filter((show) => {
        return show.genres.every((showGenre) => activeFilters.value.has(showGenre))
    })]

    showListStore.setShowList(filteredList)
})


// @TODO: list of requirements
// users view lists (preferably horizontal list) of TV shows
// based on different genres (drama, comedy, sports, etc.).

//TODO: category of shows
// A TV show dashboard that effectively
// intuitive and user-friendly UI where TV shows are not only grouped by genre
// but also categorizes and displays shows based on their genre.  Have a tab list that can see only that category????

//TODO: filtering to be implemented on FE
// You may notice there is no endpoint in the TVMaze API that cleanly returns shows by genre.
// However, the "Show index" endpoint should contain the data you need

//TODO: sorting the style and look (optional: on 2 criteria)
// sorted according to their ratings.
// implement the component

//TODO: search component
// search

// TODO: pagination
// pagination

// TODO: improve show view page
// rating component
// more details about the show

</script>

<template>
  <main class="home-view w-full flex flex-wrap justify-center items-center">
      <HomeViewHeading/>
      <!-- filter -->
      <div class="flex flex-wrap p-8 text-base font-medium">
          <div
              v-for="(genre, key) in showListService.genres"
              v-bind:key
              class="py-1 px-4 mr-2 mb-2 cursor-pointer border border-gray-300 rounded-lg hover:text-gray-500 active:border-gray-600"
              :class="{
                  'text-green-800 border-green-400 hover:text-green-600': activeFilters.has(genre)
              }"
              @click="handleFilter"
          >
              {{ genre }}
          </div>

      </div>

      <div
          v-if="showListStore.isLoading"
          class="loading-wrapper flex flex-wrap justify-center items-center"
      >
          <ShowCardSkeleton
              v-for="(skeleton, key) in Array.from(Array(20).keys())"
              v-bind:key
          />
      </div>
      <ShowCard
          v-else
          v-for="(show, key) in showListStore.getShowList" v-bind:key
          :image-url="show.image?.medium"
          :name="show.name"
          :genres="show.genres"
          :rating="show.rating?.average ? Number(show.rating.average) : 'N/A'"
          @click="() => redirectToShowView(show.id)"
      />
  </main>
</template>
