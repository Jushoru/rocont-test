import {defineStore} from "pinia"
import { ref } from "vue";
import type {bookFields, bookData} from "./bookTypes.ts";

export const useBookStore = defineStore('samples', () => {
    const books = ref<Record<string, bookData>>({});
    const errors = ref<Record<bookFields, string>>({
        name: '',
        author: '',
        year: '',
        genre: '',
    });

    const loadBooks = () => {
        const storedBooks = localStorage.getItem('books');
        books.value = storedBooks ? JSON.parse(storedBooks) : {};
    };

    const clearErrors = () => {
        errors.value = {
            name: '',
            author: '',
            year: '',
            genre: '',
        }
    };

    const getBookCount = () => {
        return Object.keys(books.value).length;
    };

    const setErrors = (newErrors: Record<bookFields, string>) => {
        errors.value = newErrors
    };

    return {
        books,
        errors,
        getBookCount,
        clearErrors,
        loadBooks,
        setErrors,
    }
});