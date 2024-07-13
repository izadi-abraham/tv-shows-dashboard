<script setup lang="ts">
import { useShowListStore } from "@/stores/show-list";
import { ref } from "vue";


type SortOptions = 'rate' | 'updated';


const showListStore = useShowListStore()
const currentSort = ref<SortOptions>('rate')


const sortOptions = ref<Record<'label' | 'value', SortOptions>[]>([
    {
        label: 'rate',
        value: 'rate'
    },
    {
        label: 'updated',
        value: 'updated'
    }
])


// Methods
const handleSort = (event) => {
    const newSort = event.target.value;

    if (newSort === currentSort.value) {
        return;
    }

    currentSort.value = newSort;

    switch (newSort) {
        case 'rate':
            showListStore.sortShowsByRate();
            break;
        case 'updated':
            showListStore.sortShowsByUpdated()
            break;
        default:
            window.alert('Sorry! couldn\'t sort based on selected value')
            break;
    }
}
</script>

<template>
    <!-- @TODO: check the name of components in their wrapper class -->
    <div
        class="sort-shows-component relative"
    >
        <label for="sort-shows-select">Sort by</label>

        <select
            name="sort"
            id="sort-shows-select"
            class="ml-2 bg-transparent p-[.1rem] border-b-2 border-blue-950 focus:outline-0"
            @change="handleSort"
        >
            <option
                v-for="(option, key) in sortOptions" v-bind:key
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>