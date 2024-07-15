<script setup lang="ts">
import ShowsSearch from '@/components/ShowsSearch/ShowsSearch.vue'
import Modal from "@/components/Modal/Modal.vue";
import { ref } from "vue";
import { useObserver } from "@/composables/useObserver";


const isModalOpen = ref(false)
const { isSmallScreen } = useObserver()

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
      class="text-white text-xl font-semibold tracking-wide drop-shadow-xl md:text-2xl md:tracking-widest uppercase"
    >
      TV Shows And Series
    </div>
    <div class="h-fit w-fit">
      <ShowsSearch @search-input-focused="handleSearchFocus"/>

      <Modal
        :is-open="isModalOpen"
        @modal-closed="() => (isModalOpen = false)"
      >
        <ShowsSearch
          :is-small-screen="isSmallScreen"
          :is-modal-open="isModalOpen"
          @search-input-focused="handleSearchFocus"
          @searched="() => (isModalOpen = false)"
        />
      </Modal>
    </div>
  </div>
</template>