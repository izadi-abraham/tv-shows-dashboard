<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";
import { ref, watch } from "vue";


const currentShowStore = useCurrentShowStore()

const text = ref('')


// Methods
//@TODO: Fix this function
const removeHTMLTags = (inputString: string) => {
    const regexPattern = '/(&nbsp;|<([^>]+)>)/ig'
    return inputString?.replace(regexPattern, "");
}


// Watchers
watch(() => currentShowStore.currentShow.summary, () => {
    text.value = removeHTMLTags(currentShowStore.currentShow?.summary)
}, {
    deep: true,
    immediate: true
})

</script>

<template>
    <div class="description-component">
        <div class="font-semibold text-2xl mb-2">
            {{ currentShowStore.currentShow.name }}
        </div>
        <div>
            {{ text }}
        </div>
    </div>
</template>