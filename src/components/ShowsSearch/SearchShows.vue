<script setup lang="ts">
import { useShowListStore } from "@/stores/show-list";
import { ShowsListService } from "@/services/showsList";
import { ref } from "vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import IconXMark from "@/components/icons/IconXMark.vue";
import IconSpiner from "@/components/icons/IconSpiner.vue";


const showListService = new ShowsListService();
const showListStore = useShowListStore()
const searchInput = ref<HTMLInputElement | null>(null)
const isSearchInputFocused = ref(false)
const searchQuery = ref<string>('')


// Methods
const handleSearch = async (event?) => {
    showListStore.setFetching(true);

    if (searchQuery.value === '') {
        await showListService.fetchShowsList();
        showListStore.setShowList(showListStore.getShowList)
        showListStore.setFetching(false)

        return;
    }

    // @TODO: handle undefined values for imageUrls
    showListService.searchShows(event.target.value).then((searchResult) => {
        const newList = searchResult.map((result) => result.show)
        showListStore.setShowList(newList)
        showListStore.setFetching(false)
    })
}

const focusSearchInput = () => {
    (searchInput.value as HTMLInputElement).focus();
}

const clearSearch = () => {
    searchQuery.value = '';
    handleSearch();
}


</script>

<template>
    <div
        class="shows-search-component relative"
    >
        <input
            type="text"
            ref="searchInput"
            v-model="searchQuery"
            class="bg-inherit w-full p-[.1rem] pl-[.2rem] focus:border-b-2 focus:border-blue-950 focus:outline-0 placeholder:text-blue-950 placeholder:opacity-60"
            @change="handleSearch"
            :placeholder="`${isSearchInputFocused ? 'search shows ...' : ''}`"
            @focus="() => isSearchInputFocused = true"
            @blur="() => isSearchInputFocused = false"
        />
        <span
            :class="`absolute top-0 opacity-65 right-0 `"
            @click="focusSearchInput"
        >
            <IconMagnifyingGlass v-if="!searchQuery"/>
            <IconSpiner class="animate-spin" v-else-if="showListStore.isLoading"/>
            <IconXMark
                v-else
                @click="clearSearch"
                class="cursor-pointer"
            />
        </span>
    </div>
</template>