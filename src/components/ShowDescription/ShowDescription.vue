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
watch(() => currentShowStore.getCurrentShow.summary, () => {
    text.value = removeHTMLTags(currentShowStore.getCurrentShow?.summary)
}, {
    deep: true,
    immediate: true
})

</script>

<template>
    <div class="description-component">
        <div class="font-semibold text-2xl my-2">
            {{ currentShowStore.getCurrentShow.name }}
        </div>
        <div>
            {{ text }}
        </div>
    </div>
</template>