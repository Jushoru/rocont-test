import {defineStore} from "pinia"
import type { bookData } from "../types/bookData";
import { ref } from "vue";


export const useSamplesStore = defineStore('samples', () => {
    const books = ref<bookData[]>([])

    return {
        books
    }
});