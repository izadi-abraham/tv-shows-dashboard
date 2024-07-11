<script setup lang="ts">
import { ShowsListService } from "@/services/showsList";
import { ref } from "vue";


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
  <main>
      <h1 v-if="loading">Loading...</h1>
      <div v-else v-for="(show, key) in shows" v-bind:key>
          {{ show }}
      </div>
  </main>
</template>
