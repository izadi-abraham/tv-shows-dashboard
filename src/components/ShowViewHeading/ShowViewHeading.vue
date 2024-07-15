<script setup lang="ts">
import ArrowBack from "@/components/ArrowBack/ArrowBack.vue";
import ShowImage from "@/components/ShowImage/ShowImage.vue";
import ShowDescription from "@/components/ShowDescription/ShowDescription.vue";

</script>

<template>
    <div class="flex flex-col items-center w-full bg-green-700 pt-4 pb-8 px-16">
        <ArrowBack/>
        <div class="w-full flex flex-col md:flex-row  items-end justify-between text-white text-justify">
            <ShowImage/>
            <ShowDescription/>
        </div>
    </div>
</template>