<script setup lang="ts">
import ArrowBack from "@/components/ArrowBack/ArrowBack.vue";
import ShowImage from "@/components/ShowImage/ShowImage.vue";
import ShowDescription from "@/components/ShowDescription/ShowDescription.vue";
import ShowRating from "@/components/ShowRating/ShowRating.vue";
import ShowTabs from "@/components/ShowTabs/ShowTabs.vue";



</script>

<template>
    <div class="flex w-full h-[18rem] bg-green-900 py-4 px-16">

        <div class="w-[20%]">
            <ArrowBack/>
            <ShowImage/>
        </div>

        <div class="w-[80%] pt-[4rem] text-white text-justify">

            <!-- rating component -->
            <ShowRating :rate="8"/>

            <!-- description component -->
            <ShowDescription/>

        </div>
    </div>
</template>