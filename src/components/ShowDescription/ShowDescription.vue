<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";
import { ref, watch } from "vue";
import ShowRating from "@/components/ShowRating/ShowRating.vue";


const currentShowStore = useCurrentShowStore()

const text = ref('')


// Methods
//@TODO: Fix this function
const removeHTMLTags = (inputString: string) => {
    const regexPattern = '/(&nbsp;|<([^>]+)>)/ig'
    return inputString?.replace(regexPattern, "");
}


// Watchers
watch(() => currentShowStore.getCurrentShow.summary, () => {
    text.value = removeHTMLTags(currentShowStore.getCurrentShow?.summary)
}, {
    deep: true,
    immediate: true
})

</script>

<template>
    <div class="description-component">
        <div class="font-semibold text-2xl mb-1">
            {{ currentShowStore.getCurrentShow.name }}
        </div>
        <!-- rating component -->
        <ShowRating :rate="8" class="mb-1"/>
        <div>
            {{ text }}
        </div>
    </div>
</template>