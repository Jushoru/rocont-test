import {defineStore} from "pinia"
import { ref } from "vue";

type bookData = {
    name: string;
    author: string;
    year: string;
    genre: string;
}

export const useSamplesStore = defineStore('samples', () => {
    const books = ref<Record<string, bookData>>({});

    const loadBooks = () => {
        const storedBooks = localStorage.getItem('books');
        books.value = storedBooks ? JSON.parse(storedBooks) : {};
    };

    const getBookCount = () => {
        return Object.keys(books.value).length;
    };

    return {
        books,

        getBookCount,

        loadBooks
    }
});