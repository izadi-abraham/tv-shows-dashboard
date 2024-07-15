<script setup lang="ts">
import SearchShows from '@/components/ShowsSearch/ShowsSearch.vue'
import Modal from "@/components/Modal/Modal.vue";
import { ref } from "vue";


const isSmallScreen = ref(false)
const isModalOpen = ref(false)


// Methods
const observer = new ResizeObserver((entry) => {
    entry[0].contentRect?.width < 640 ? isSmallScreen.value = true : isSmallScreen.value = false
});

observer.observe(document.body)

const handleSearchFocus = () => {
    if (isSmallScreen.value) {
        isModalOpen.value = true
    }
}
</script>

<template>
  <div
    class="home-view-heading flex items-center justify-between w-full h-24 px-8 sm:px-12 bg-green-700 sticky top-0 z-[999999]"
  >
    <div
      class="text-white text-xl font-semibold tracking-wide drop-shadow-xl md:text-2xl md:tracking-widest"
    >
      TV Shows And Series
    </div>
    <div class="h-fit w-fit">
      <SearchShows @search-input-focused="handleSearchFocus"/>

      <Modal
        :is-open="isModalOpen"
        @modal-closed="() => (isModalOpen = false)"
      >
        <SearchShows
          :is-small-screen="isSmallScreen"
          :is-modal-open="isModalOpen"
          @search-input-focused="handleSearchFocus"
          @searched="() => (isModalOpen = false)"
        />
      </Modal>
    </div>
  </div>
</template>