<script setup lang="ts">
import { useShowListStore } from "@/stores/show-list";
import { watch, ref } from "vue";
import { ShowsListService } from "@/services/showsList";
import IconXMark from "@/components/icons/IconXMark.vue";


const showListStore = useShowListStore();
const showListService = new ShowsListService()

const activeFilters = ref<Set<string>>(new Set<string>());


// Methods
const handleFilter = (genre) => {
    activeFilters.value.add(genre);
}

const removeFilter = (genre) => {
    activeFilters.value.delete(genre)
}


// Watchers
watch(() => activeFilters.value.size, async (sizeOfActiveFilters) => {

    // @TODO: move filtering to the store
    // @TODO: implement the intersection, subset filter

    if (sizeOfActiveFilters === 0) {
        await showListService.fetchShowsList()

        return;
    }

    const filteredList = showListStore.getShowList.filter((show) => {
        return show.genres.every((showGenre) => activeFilters.value.has(showGenre))
    })

    showListStore.setShowList(filteredList)
})

</script>

<template>
    <div class="show-filter-component flex justify-center items-center w-full h-fit flex-wrap p-8 text-sm font-medium">
        <div
            v-for="(genre, key) in showListStore.getGenres"
            v-bind:key
            class="flex justify-between items-center pl-5 px-2 py-1 mb-2 mr-2 cursor-pointer border border-gray-300 rounded-lg hover:text-gray-500 active:border-gray-600"
            :class="{
                  'text-green-800 border-green-400 hover:text-green-600': activeFilters.has(genre)
              }"
            @click="() => handleFilter(genre)"
        >
            <div>
                {{ genre }}
            </div>
            <div
                class="h-fit ml-2 hover:text-orange-500 hover:shadow-2xl hover:shadow-amber-400 active:text-blue-950"
                @click.capture.stop="() => removeFilter(genre)"
            >
                <IconXMark
                    v-if="activeFilters.has(genre)"
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