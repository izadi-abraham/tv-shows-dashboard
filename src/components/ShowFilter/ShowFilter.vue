<script setup lang="ts">
import { useShowListStore } from "@/stores/show-list";
import { ref } from "vue";
import IconXMark from "@/components/icons/IconXMark.vue";


type FilterType = 'exact-match' | 'subset-match';
const showListStore = useShowListStore();
const filterType = ref<FilterType>('exact-match')


// Methods
const addFilter = (genre) => {
    showListStore.addFilter(genre);
    changeFilter();
}

const removeFilter = (genre) => {
    showListStore.removeFilter(genre)
    changeFilter();
}

const changeFilterType = () => {
    filterType.value = filterType.value === 'exact-match' ? 'subset-match' : 'exact-match'
    changeFilter()
}

const changeFilter = () => {

    if (showListStore.getActiveFilters.size === 0) {
        showListStore.clearFilters();
        return;
    }

    // @TODO: sort selected filters
    // @TODO: we can hide the filters (toggle if user wants to) and also have a tabs component (so that is category)
    // @TODO: break the logic for type of filters into 2 methods
    // @TODO: filter out the genres with undefined/NA
    const filteredList = showListStore.getShowList.filter((show) => {
        const showGenreSet = new Set(show.genres)

        if (filterType.value === 'exact-match') {
            return showGenreSet.difference(showListStore.getActiveFilters).size === 0
        }

        if (filterType.value === 'subset-match') {
            const activeFilterSet = new Set(showListStore.getActiveFilters)
            return activeFilterSet.isSubsetOf(showGenreSet)
        }
    })

    showListStore.setFilteredList(filteredList)
}

</script>

<template>
    <div class="show-filter-component flex justify-center items-center w-full h-fit flex-wrap p-8 text-sm font-medium">
        <div
            title="How do you want to apply your filters?"
            class=" w-full cursor-pointer mb-8"
            @click="changeFilterType"> {{ filterType }}
        </div>
        <div
            v-for="(genre, key) in showListStore.getGenres"
            v-bind:key
            class="flex justify-between items-center pl-5 px-2 py-1 mb-2 mr-2 cursor-pointer border border-gray-300 rounded-lg hover:text-gray-500 active:border-gray-600"
            :class="{
                  'text-green-800 border-green-400 hover:text-green-600': showListStore.getActiveFilters.has(genre)
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
                    v-if="showListStore.getActiveFilters.has(genre)"
                    size="12"
                />
                <div
                    v-else
                    class="w-[12px] h-12[px]"
                />
            </div>
        </div>
    </div>
</template>