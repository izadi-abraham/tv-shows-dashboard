<script setup lang="ts">

import IconXMark from "@/components/Icons/IconXMark.vue";

interface Props {
    isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isOpen: false
});

const emit = defineEmits<{
    (event: 'modalClosed'): void
}>();

</script>

<template>
    <div v-if="props.isOpen"
         class="modal-component fixed w-full h-full top-0 left-0 bg-white z-[9999999]"
    >
        <div class="modal-content-wrapper">
            <div class="flex flex-col justify-center items-center" ref="target">
                <div class="modal-header flex w-full p-8 justify-end">
                    <IconXMark class="text-black" @click="() => emit('modalClosed')"/>
                </div>
                <div class="modal-body w-full">
                    <slot> default slot </slot>
                </div>
            </div>
        </div>
    </div>
</template>