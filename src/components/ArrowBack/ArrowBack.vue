<script setup lang="ts">
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { useRouter } from "vue-router";


const router = useRouter();


// Methods
const goBack = () => {
    router.go(-1)
}

</script>

<template>
    <div
        class="w-fit text-gray-300 cursor-pointer"
        @click="goBack()"
    >
        <IconArrowLeft/>
    </div>
</template>