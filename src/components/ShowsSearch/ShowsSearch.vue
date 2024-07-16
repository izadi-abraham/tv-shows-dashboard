<script setup lang="ts">
import { useShowListStore } from '@/stores/show-list'
import { ShowsListService } from '@/services/showsList'
import { computed, onMounted, ref } from 'vue'
import IconMagnifyingGlass from '@/components/Icons/IconMagnifyingGlass.vue'
import IconXMark from '@/components/Icons/IconXMark.vue'
import IconSpiner from '@/components/Icons/IconSpiner.vue'


const emit = defineEmits<{
  (event: 'magnifierClicked'): void
  (event: 'searchPerformed'): void
}>()

interface Props {
  isModalOpen?: boolean
}

const props = defineProps<Props>()

const showListService = new ShowsListService()
const showListStore = useShowListStore()
const searchInput = ref<HTMLInputElement | null>(null)
const isSearchInputFocused = ref(false)
const searchLoading = ref(false)


// Methods
const performSearch = async (event?) => {
  showListStore.setFetching(true)
  searchLoading.value = true

  showListService.searchShows(event.target.value).then((searchResult) => {
    const mappedSearchResult = searchResult.map((result) => result.show)
    showListStore.setSearchResult(mappedSearchResult)
    showListStore.setFetching(false)
    searchLoading.value = false
  })

  showListStore.setSearchQuery(event.target.value)

  emit('searchPerformed')
}

const magnifierClicked = () => {
    emit('magnifierClicked');
    (searchInput.value as HTMLInputElement).focus()
}

const clearSearch = () => {
  showListStore.setSearchQuery('')
  showListStore.setSearchResult([])
}

onMounted(() => {
  if (props.isModalOpen) {
      (searchInput.value as HTMLInputElement).focus()
  }
})


// Watchers
const showMagnifyingGlass = computed(() => {
    return !props.isModalOpen && !showListStore.getSearchQuery && !searchLoading.value && !isSearchInputFocused.value;
})

const showSpinner = computed(() => {
    return searchLoading.value;
})

const showIconX = computed(() => {
    return showListStore.getSearchQuery;
})

</script>

<template>
  <div :class="`shows-search-component relative text-white w-full ${isModalOpen ? 'max-w-80 mx-auto' : ''}`">
    <input
      type="text"
      ref="searchInput"
      :value="showListStore.getSearchQuery"
      @change="(event) => showListStore.setSearchQuery(event.target.value)"
      :class="`bg-inherit p-[.1rem] pl-[.2rem] placeholder:opacity-60 focus:outline-0
      placeholder:text-green-600 w-full focus:border-b-2 focus:border-green-700 text-green-700
      sm:focus:border-white sm:placeholder:text-white sm:text-white`"
      @keyup.enter="performSearch"
      :placeholder="`${isSearchInputFocused || isModalOpen ? 'search shows ...' : ''}`"
      @focus="() => (isSearchInputFocused = true)"
      @blur="() => (isSearchInputFocused = false)"
      title="Press enter to perform search"
    />
    <span
      class="outside-modal absolute top-0 opacity-65 right-0 text-white cursor-pointer"
    >
      <IconMagnifyingGlass
        v-show="showMagnifyingGlass"
        @click="magnifierClicked"
        class="text-sm sm:text-2xl"
      />
      <IconSpiner
          v-show="showSpinner"
          class="animate-spin"
      />
      <IconXMark
        v-show="showIconX"
        @click="clearSearch"
        :class="`cursor-pointer ${isModalOpen ? 'text-green-600' : ''}`"
      />
    </span>
  </div>
</template>