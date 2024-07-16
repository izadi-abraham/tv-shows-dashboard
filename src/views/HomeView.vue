<script setup lang="ts">
import { ShowsListService } from '@/services/showsList'
import ShowCard from '@/components/ShowCard/ShowCard.vue'
import ShowCardSkeleton from '@/components/ShowCard/ShowCardSkeleton.vue'
import { useRouter } from 'vue-router'
import { useShowListStore } from '@/stores/show-list'
import HomeViewHeading from '@/components/HomeViewHeading/HomeViewHeading.vue'
import ShowFilter from '@/components/ShowFilter/ShowFilter.vue'
import { computed, ref } from 'vue'
import ShowFilterSkeleton from '@/components/ShowFilter/ShowFilterSkeleton.vue'
import { useObserver } from "@/composables/useObserver";
import Modal from "@/components/GenericModal/GenericModal.vue";
import SortShows from "@/components/ShowsSort/ShowsSort.vue";


const showListService = new ShowsListService()
const router = useRouter()
const showListStore = useShowListStore()
const { isSmallScreen } = useObserver()
const showFilterSection = ref(false)
const showFilterModal = ref(false)


// Methods
const initialize = async () => {
  showListStore.setFetching(true)
  await showListService.fetchShowsList()
  showListStore.sortShowsByRate()
  showListStore.setFetching(false)
}

const redirectToShowView = (id: number) => {
  router.push({
    name: 'show-view',
    params: {
      id
    }
  })
}

initialize()

const handleShowFilter = () => {

    if (showListStore.isLoading) {
        return;
    } else if (isSmallScreen.value) {
        showFilterModal.value = true;
    } else {
        showFilterSection.value = !showFilterSection.value
    }
}


// Watchers
const currentShowList = computed(() => {
  if (showListStore.getCurrentFilter?.size) {
    return showListStore.getFilteredList
  } else if (showListStore.getSearchQuery){
    return showListStore.getSearchResult
  } else {
    return showListStore.getShowList
  }
})


</script>

<template>
  <main class="home-view w-full flex flex-wrap justify-center items-center">
    <HomeViewHeading />

    <div
        class="filter-button flex w-full items-center justify-around py-8"
    >
      <div
          class="cursor-pointer hover:text-gray-500"
          @click="handleShowFilter"
      >
          <div
              v-if="showFilterSection && !isSmallScreen"
              class="tracking-wide font-bold"
          >
              Hide Filters</div>
          <div
              v-else
              class="tracking-wide font-bold"
          >
              Show Filters
          </div>
      </div>
        <SortShows class="mr-2 block sm:hidden" />
    </div>

    <div
        class="filter-section-wrapper flex flex-col items-center"
    >
      <ShowFilterSkeleton v-if="showListStore.isLoading && !isSmallScreen" />
      <ShowFilter v-else-if="showFilterSection && !isSmallScreen" />
      <Modal :is-open="showFilterModal" @modal-closed="() => showFilterModal = false">
          <ShowFilter @apply-filter="() => showFilterModal = false"/>
      </Modal>
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
    <div
      v-else
      class="show-cards-wrapper flex flex-wrap justify-center items-center"
    >
      <ShowCard
        v-for="(show, key) in currentShowList"
        v-bind:key
        :image-url="show.image?.medium"
        :name="show.name"
        :genres="show.genres"
        :rating="show.rating?.average ? Number(show.rating.average) : 'N/A'"
        @click="() => redirectToShowView(show.id)"
      />
    </div>
  </main>
</template>
