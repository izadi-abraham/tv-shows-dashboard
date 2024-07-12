<script setup lang="ts">
import { ShowsListService } from "@/services/showsList";
import { ref } from "vue";
import ShowCard from "@/components/ShowCard/ShowCard.vue";
import ShowCardSkeleton from "@/components/ShowCard/ShowCardSkeleton.vue";
import { useRouter } from "vue-router";


// Initialization, Interfaces
const service = new ShowsListService();
const router = useRouter();


// States
const loading = ref(false)
const shows = ref([])


// Methods
const initialize = async () => {
    loading.value = true;
    shows.value = await service.getShowList();
    loading.value = false;
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

</script>

<template>
  <main class="home-view p-8 w-full flex flex-wrap justify-center items-center">
          <div
              v-if="loading"
              class="loading-wrapper flex flex-wrap justify-center items-center"
          >
              <ShowCardSkeleton
                  v-for="(skeleton, key) in Array.from(Array(20).keys())"
                  v-bind:key
              />
          </div>
          <ShowCard
              v-else
              v-for="(show, key) in shows" v-bind:key
              :image-url="show.image.medium"
              :name="show.name"
              :genres="show.genres"
              :rating="show.rating.average ? Number(show.rating.average) : 'N/A'"
              @click="() => redirectToShowView(show.id)"
          />
      <!-- @TODO: add pagination component -->
  </main>
</template>
