<script lang="ts">
import { useShowListStore } from '@/stores/show-list'
import { computed, ref } from 'vue'


type FilterType = 'exact-match' | 'subset-match' | 'partial-match'
export const filterType = ref('partial-match')


// Methods
export const changeFilter = () => {
  // @TODO: sort selected filters
  // @TODO: we can hide the filters (toggle if user wants to) and also have a tabs component (so that is category)
  // @TODO: break the logic for type of filters into 2 methods
  // @TODO: filter out the genres with undefined/NA

  const filteredList = useShowListStore().getShowList.filter((show) => {
    const showGenreSet = new Set(show.genres)

    if (filterType.value === 'exact-match') {
      return currentFilter.value.names.every(
        (filter) => showGenreSet.has(filter) && showGenreSet.size == currentFilter.value.count
      )
    }

    if (filterType.value === 'subset-match') {
      return currentFilter.value.names.every((filter) => showGenreSet.has(filter))
    }

    if (filterType.value === 'partial-match') {
      return currentFilter.value.names.some((filter) => showGenreSet.has(filter))
    }
  })
  useShowListStore().setFilteredList(filteredList)
}


// Watchers
const currentFilter = computed(() => {
    const currentFilter = []
    useShowListStore().getCurrentFilter.forEach((filterKey) => currentFilter.push(filterKey))
    return {
        names: currentFilter,
        count: currentFilter.length,
        exist: !!currentFilter.length
    }
})

</script>
<script setup lang="ts">
import IconXMark from '@/components/Icons/IconXMark.vue'
import SortShows from '@/components/ShowsSort/ShowsSort.vue'


const emit = defineEmits<{
    (event: 'apply-filter'): void
}>()

const filterOptions = ref<Record<'label' & 'value', FilterType>[]>([
  {
    label: 'Exact',
    value: 'exact-match'
  },
  {
    label: 'Subset',
    value: 'subset-match'
  },
  {
    label: 'Partial',
    value: 'partial-match'
  }
])


// Methods
const addFilter = (genre) => {
  useShowListStore().addFilter(genre)
  changeFilter()
}

const removeFilter = (genre) => {
  useShowListStore().removeFilter(genre)
  useShowListStore().getCurrentFilter.size === 0
    ? useShowListStore().clearFilters()
    : changeFilter()
}

const changeFilterType = (event) => {
  filterType.value = event.target.value
  changeFilter()
}


// Watchers
const filterTitle = computed(() => {
  if (!useShowListStore().getCurrentFilter.size) {
    return 'Please select at least one filter.'
  }

  switch (filterType.value) {
    case 'exact-match':
      return `You are seeing all the shows with only "${currentFilter.value.names.join(', ')}" genre${currentFilter.value.count > 1 ? 's' : ''}.`
    case 'subset-match':
      return `You are seeing all the shows that "${currentFilter.value.names.join(', ')}" include${currentFilter.value.count === 1 ? 's' : ''} in their genre(s).`
    case 'partial-match':
      return currentFilter.value.count === 1
        ? `You are seeing all the shows that "${currentFilter.value.names.join(', ')}" includes in their genre(s).`
        : `You are seeing all the shows with whether "${currentFilter.value.names.join('", or "')} or "${currentFilter.value.names.join(', ')}" genres.`
    default:
      return ''
  }
})
</script>

<template>
  <div class="show-filter-component py-8 pt-2">
    <div class="flex px-16 justify-center mb-8 sm:justify-between sm:m-0 items-center w-full text-lg">
      <div class="filter-type-wrapper">
        <label for="filter-shows-select"> Filter Type: </label>
        <select
          name="filter-shows-select"
          id="filter-shows-select"
          :class="`ml-2 bg-transparent p-[.1rem] border-b-2 border-blue-950 focus:outline-0 ${currentFilter.exist ? 'cursor-pointer' : 'cursor-not-allowed'}`"
          :disabled="!currentFilter.exist"
          :value="filterType"
          :title="filterTitle"
          @change="changeFilterType"
        >
          <option
            v-for="(option, key) in filterOptions"
            v-bind:key
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <SortShows class="mr-2 hidden sm:block" />
    </div>
    <div
      class="flex justify-center items-center w-full h-fit flex-wrap p-2 sm:p-8 pt-4 text-sm font-medium"
    >
      <div
        v-for="(genre, key) in useShowListStore().getGenres"
        v-bind:key
        class="flex justify-between items-center pl-5 px-2 py-1 mb-2 mr-2 cursor-pointer border border-gray-300 rounded-lg hover:text-gray-500 active:border-gray-600"
        :class="{
          'text-green-800 border-green-400 hover:text-green-600':
            useShowListStore().getCurrentFilter.has(genre)
        }"
        @click="() => addFilter(genre)"
      >
        <div>
          {{ genre }}
        </div>
        <div
          class="h-fit ml-2 hover:text-orange-500 hover:shadow-2xl hover:shadow-amber-400 active:text-blue-950"
          @click.capture.stop="() => removeFilter(genre)"
        >
          <IconXMark
            v-if="useShowListStore().getCurrentFilter.has(genre)"
            size="12"
          />
          <div
            v-else
            class="w-[12px] h-12[px]"
          />
        </div>
      </div>
    </div>

      <button
          class="w-fit mx-auto px-4 block mt-6 border-[1px] rounded-md active:border-gray-800 sm:hidden"
          @click="() => emit('apply-filter')"
      >
          Apply
      </button>
  </div>
</template>
