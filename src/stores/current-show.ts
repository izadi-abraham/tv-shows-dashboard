import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentShowStore = defineStore('currentShow', () => {
  const currentShow = ref({})
  const loading = ref(false)


  const setCurrentShow = (show: any) => {
    currentShow.value = show;
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const isLoading = computed(() => loading.value)

  return { currentShow, setCurrentShow, setLoading, isLoading }
})
