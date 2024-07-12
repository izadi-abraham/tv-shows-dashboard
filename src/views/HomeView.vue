<script setup lang="ts">
import { ShowsListService } from "@/services/showsList";
import { ref } from "vue";
import ShowCard from "@/components/Card/ShowCard.vue";
import ShowCardSkeleton from "@/components/Card/ShowCardSkeleton.vue";


const service = new ShowsListService();

const loading = ref(false)
const shows = ref([])
const initialize = async () => {
    loading.value = true;
    shows.value = await service.getShowList();
    loading.value = false;
};

initialize();

</script>

<template>
  <main class="p-8 w-full flex flex-wrap justify-center items-center">
          <div
              v-if="loading"
              class="flex flex-wrap justify-center items-center"
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
          />
  </main>
</template>
