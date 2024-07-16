<script setup lang="ts">
import ShowsSearch from '@/components/ShowsSearch/ShowsSearch.vue'
import Modal from "@/components/GenericModal/GenericModal.vue";
import { ref } from "vue";
import { useObserver } from "@/composables/useObserver";


const isModalOpen = ref(false)
const { isSmallScreen } = useObserver()


// Methods
const magnifierClicked = () => {
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
      <ShowsSearch
          @magnifier-clicked="magnifierClicked"
      />

      <Modal
        :is-open="isModalOpen"
        @modal-closed="() => (isModalOpen = false)"
      >
        <ShowsSearch
          :is-modal-open="isModalOpen"
          @search-performed="() => (isModalOpen = false)"
        />
      </Modal>
    </div>
  </div>
</template>