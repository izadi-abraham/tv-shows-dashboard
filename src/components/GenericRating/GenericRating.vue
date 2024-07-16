<script setup lang="ts">
import IconStar from "@/components/Icons/IconStarFullStroke.vue";
import IconStarHalfStroke from "@/components/Icons/IconStarHalfStroke.vue";


interface Props {
    rate: number
}

const props = defineProps<Props>()

</script>

<template>
    <div class="show-rating-component flex">
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStar class="text-orange-400 mr-1"/>
        <IconStarHalfStroke class="text-orange-400"/>
    </div>
</template>