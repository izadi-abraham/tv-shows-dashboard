import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useShowListStore = defineStore('showList', () => {
  const showList = ref<any[]>([])
  const loading = ref(false)


  // Actions
  const setShowList = (newShowList: any[]) => {
    showList.value = newShowList;
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const sortShows = () => {
    showList.value.sort((firstShow, secondShow) => {
      return secondShow.rating.average - firstShow.rating.average
    })
  }


  // Getters
  const isLoading = computed(() => loading.value)

  const getShowList = computed(() => showList.value)


  return {
    showList,
    setShowList,
    getShowList,
    setLoading,
    isLoading,
    sortShows
  }
})
