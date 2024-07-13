<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";
import IconStar from "@/components/icons/IconStarFullStroke.vue";
import IconStarHalfStroke from "@/components/icons/IconStarHalfStroke.vue";
import IconStarFullStroke from "@/components/icons/IconStarFullStroke.vue";


interface Props {
    rate: number
}

const props = defineProps<Props>()

const currentShowStore = useCurrentShowStore()

</script>

<template>
    <div class="show-rating-component flex">
        <IconStar class="text-orange-400"/>
        <IconStarHalfStroke class="text-orange-400 opacity-90"/>
        <IconStarFullStroke/>
        <IconStar class="text-green-900"/>
    </div>
</template>