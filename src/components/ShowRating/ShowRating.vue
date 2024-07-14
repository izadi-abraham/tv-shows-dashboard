<script setup lang="ts">
import { useCurrentShowStore } from "@/stores/current-show";
import IconStar from "@/components/Icons/IconStarFullStroke.vue";
import IconStarHalfStroke from "@/components/Icons/IconStarHalfStroke.vue";


interface Props {
    rate: number
}

const props = defineProps<Props>()

const currentShowStore = useCurrentShowStore()

</script>

<template>
    <div class="show-rating-component flex">
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStarHalfStroke class="text-orange-400"/>
<!--        <IconStarFullStroke/>-->
<!--        <IconStar class="text-green-900"/>-->
    </div>
</template>