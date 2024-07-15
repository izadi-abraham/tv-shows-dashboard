import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useShowListStore = defineStore('showList', () => {
  const showList = ref<any[]>([])
  const filteredList = ref<any[]>([])
  const searchResult = ref<any[]>([])
  const searchQuery = ref('')
  const genres = ref<string[]>()
  // TODO: change loading names to fetching
  const loading = ref(false)
  const currentFilter = ref<Set<string>>(new Set<string>())

  // Actions
  const setShowList = (newShowList: any[]) => {
    showList.value = newShowList
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const sortShowsByRate = () => {
    showList.value.sort((firstShow, secondShow) => {
      return secondShow.rating.average - firstShow.rating.average
    })
  }

  const sortShowsByUpdated = () => {
    showList.value.sort((firstShow, secondShow) => {
      return secondShow.updated - firstShow.updated
    })
  }

  const setGenres = (newGenres: string[]) => {
    genres.value = newGenres
  }

  const setFilteredList = (newFilteredList: any[]) => {
    filteredList.value = newFilteredList
  }

  const setSearchResult = (newSearchResult: any[]) => {
    searchResult.value = newSearchResult
  }

  const setSearchQuery = (newSearchQuery: string) => {
    searchQuery.value = newSearchQuery
  }

  const clearFilters = () => {
    currentFilter.value.clear()
  }

  const removeFilter = (genre: string) => {
    currentFilter.value.delete(genre)
  }

  const addFilter = (genre: string) => {
    currentFilter.value.add(genre)
  }

  // Getters
  const isLoading = computed(() => loading.value)

  const getShowList = computed(() => showList.value)

  const getGenres = computed(() => genres.value)

  const getCurrentFilter = computed(() => currentFilter.value)

  const getFilteredList = computed(() => filteredList.value)

  const getSearchResult = computed(() => searchResult.value)

  const getSearchQuery = computed(() => searchQuery.value)

  return {
    showList,
    getShowList,
    isLoading,
    getGenres,
    getCurrentFilter,
    getFilteredList,
    getSearchResult,
    getSearchQuery,
    setShowList,
    setFetching: setLoading,
    sortShowsByRate,
    sortShowsByUpdated,
    setGenres,
    setFilteredList,
    clearFilters,
    addFilter,
    removeFilter,
    setSearchResult,
    setSearchQuery
  }
})
