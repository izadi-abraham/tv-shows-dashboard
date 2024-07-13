import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useShowListStore = defineStore('showList', () => {
  const showList = ref<any[]>([])
  const filteredList = ref<any[]>([])
  const genres = ref<string[]>()
  const loading = ref(false)
  const activeFilters = ref<Set<string>>(new Set<string>());


  // Actions
  const setShowList = (newShowList: any[]) => {
    showList.value = newShowList;
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
    filteredList.value = newFilteredList;
  }

  const clearFilters = () => {
    activeFilters.value.clear()
  }

  const removeFilter = (genre: string) => {
    getActiveFilters.value.delete(genre)
  }

  const addFilter = (genre: string) => {
    getActiveFilters.value.add(genre)
  }


  // Getters
  const isLoading = computed(() => loading.value)

  const getShowList = computed(() => showList.value)

  const getGenres = computed(() => genres.value)

  const getActiveFilters = computed(() => activeFilters.value)

  const getFilteredList = computed(() => filteredList.value)


  return {
    showList,
    getShowList,
    isLoading,
    getGenres,
    getActiveFilters,
    getFilteredList,
    setShowList,
    setLoading,
    sortShowsByRate,
    sortShowsByUpdated,
    setGenres,
    setFilteredList,
    clearFilters,
    addFilter,
    removeFilter
  }
})
