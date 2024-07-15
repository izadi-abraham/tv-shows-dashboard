<script setup lang="ts">
import { useShowListStore } from '@/stores/show-list'
import { ShowsListService } from '@/services/showsList'
import { onMounted, ref } from 'vue'
import IconMagnifyingGlass from '@/components/Icons/IconMagnifyingGlass.vue'
import IconXMark from '@/components/Icons/IconXMark.vue'
import IconSpiner from '@/components/Icons/IconSpiner.vue'

// @TODO: fix IconSpinner typo

const emit = defineEmits<{
  (event: 'searchInputFocused'): void
  (event: 'searched'): void
}>()

interface Props {
  isSmallScreen?: boolean
  isModalOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSmallScreen: false
})

const showListService = new ShowsListService()
const showListStore = useShowListStore()
const searchInput = ref<HTMLInputElement | null>(null)
const isSearchInputFocused = ref(false)
const searchQuery = ref<string>('')

// Methods
const handleSearch = async (event?) => {
  showListStore.setFetching(true)

  if (searchQuery.value === '') {
    await showListService.fetchShowsList()
    showListStore.setShowList(showListStore.getShowList)
    showListStore.setFetching(false)

    return
  }

  // @TODO: handle undefined values for imageUrls
  showListService.searchShows(event.target.value).then((searchResult) => {
    const newList = searchResult.map((result) => result.show)
    showListStore.setShowList(newList)
    showListStore.setFetching(false)
  })

  emit('searched')
}

const focusSearchInput = () => {
  emit('searchInputFocused');
  (searchInput.value as HTMLInputElement).focus()
}

const clearSearch = () => {
  searchQuery.value = ''
  handleSearch()
}

onMounted(() => {
  if (props.isModalOpen) {
    focusSearchInput()
  }
})
</script>

<template>
  <div :class="`shows-search-component relative text-white w-full ${isModalOpen ? 'max-w-80 mx-auto' : ''}`">
    <input
      type="text"
      ref="searchInput"
      v-model="searchQuery"
      :class="{
        [`bg-inherit p-[.1rem] pl-[.2rem] placeholder:opacity-60 focus:outline-0`]: true,
        [`w-0 border-0  placeholder:text-white
                sm:w-full sm:focus:border-b-2 sm:focus:border-white`]: !isSmallScreen,
        [`text-green-600 placeholder:text-green-600
                w-full border-b-2 border-green-700`]: isSmallScreen
      }"
      @keyup.enter="handleSearch"
      :placeholder="`${isSearchInputFocused || isModalOpen ? 'search shows ...' : ''}`"
      @focus="() => (isSearchInputFocused = true)"
      @blur="() => (isSearchInputFocused = false)"
      title="Press enter to perform search"
    />
    <span
      class="outside-modal absolute top-0 opacity-65 right-0 text-white cursor-pointer"
      @click="focusSearchInput"
    >
      <IconMagnifyingGlass
        v-if="!searchQuery"
        class="text-sm sm:text-2xl"
      />
      <IconSpiner
        class="animate-spin"
        v-else-if="showListStore.isLoading"
      />
      <IconXMark
        v-else
        @click="clearSearch"
        :class="`cursor-pointer ${isModalOpen ? 'text-green-600' : ''}`"
      />
    </span>
  </div>
</template>