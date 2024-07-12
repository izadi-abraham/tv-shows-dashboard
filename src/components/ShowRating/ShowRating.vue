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
        <IconStar class="text-slate-50 opacity-50"/>
    </div>
</template>