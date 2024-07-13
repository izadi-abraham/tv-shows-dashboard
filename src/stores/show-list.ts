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


  // Getters
  const isLoading = computed(() => loading.value)

  const getShowList = computed(() => showList.value)


  return {
    showList,
    setShowList,
    getShowList,
    setLoading,
    isLoading,
    sortShowsByRate,
    sortShowsByUpdated
  }
})