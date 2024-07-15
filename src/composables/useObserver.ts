import { ref } from "vue";


export const useObserver = () => {
    const isSmallScreen = ref(false)
    // Methods
    const observer = new ResizeObserver((entry) => {
        entry[0].contentRect?.width < 640 ? isSmallScreen.value = true : isSmallScreen.value = false
    });



    observer.observe(document.body)


    return {
        isSmallScreen
    }
}