<script setup lang="ts">
import { ref } from "vue";


interface Props {
    tabNames: string[]
}

const props = defineProps<Props>()


const activeTab = ref<string>(props.tabNames[0])
const slotNames = ref(props.tabNames.map((tabName) => tabName.toLowerCase()));


// Methods
const changeActiveTab = (tabName: string) => {
    activeTab.value = tabName
}

</script>

<template>
    <div
        class="show-tabs-component pt-8 pb-16 px-16"
    >
        <ul
            class="flex justify-between md:justify-center items-center h-16"
        >
            <li
                v-for="(tabName, key) in props.tabNames"
                v-bind:key
                :class="`mx-4 font-semibold text-lg cursor-pointer hover:text-gray-500
                 ${activeTab === tabName ? 'text-green-800 underline underline-offset-8 decoration-green-800 hover:text-green-600 hover:decoration-green-600' : ''}`"
                @click="() => changeActiveTab(tabName)"
            >
                {{ tabName }}
            </li>
        </ul>
        <template
            v-for="(slotName, key) in slotNames"
            v-bind:key
        >
            <slot
                :name="slotName"
                v-if="slotName === activeTab.toLowerCase()"
            />
        </template>
    </div>
</template>