import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentShowStore = defineStore('currentShow', () => {
  const currentShow = ref({})
  // TODO: change loading names to fetching
  const fetching = ref(false)
  const episodes = ref<any[]>([]);
  const seasons = ref<any[]>([]);
  const episodeFetching = ref();
  const seasonFetching = ref();


  // Actions
  const setCurrentShow = (show: any) => {
    currentShow.value = show;
  }

  const setFetching = (value: boolean) => {
    fetching.value = value
  }

  const setEpisodeFetching = (value: boolean) => {
    episodeFetching.value = value
  }

  const setSeasonFetching = (value: boolean) => {
    seasonFetching.value = value
  }

  const setEpisodes = (newEpisodes: any[]) => {
    episodes.value = newEpisodes
  }

  const setSeasons = (newSeasons: any[]) => {
    seasons.value = newSeasons
  }


  // Getters
  const getCurrentShow = computed(() => currentShow.value)

  const getEpisodes = computed(() => episodes.value)

  const getSeasons = computed(() => seasons.value)

  const isFetching = computed(() => fetching.value)

  const isEpisodeFetching = computed(() => episodeFetching.value)

  const isSeasonFetching = computed(() => seasonFetching.value)

  return {
    currentShow,
    isFetching,
    isEpisodeFetching,
    getCurrentShow,
    getEpisodes,
    getSeasons,
    isSeasonFetching,
    setSeasonFetching,
    setFetching,
    setCurrentShow,
    setEpisodeFetching,
    setEpisodes,
    setSeasons
  }
})
