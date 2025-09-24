import {defineStore} from "pinia"
import {ref} from "vue";
import type {bookFields, bookData} from "./bookTypes";

export const useBookStore = defineStore('samples', () => {
    const books = ref<Record<string, bookData>>({});
    const errors = ref<Record<bookFields, string>>({
        name: '',
        author: '',
        year: '',
        genre: '',
    });

    const getBooks = () => {
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

    const setBooks = () => {
        localStorage.setItem('books', JSON.stringify(books.value))
        getBooks();
    }

    const deleteBook = async (id: string) => {
        delete books.value[id];
        setBooks();
    }

    const setErrors = (newErrors: Record<bookFields, string>) => {
        errors.value = newErrors
    };

    return {
        books,
        errors,
        getBookCount,
        setBooks,
        deleteBook,
        clearErrors,
        getBooks,
        setErrors,
    }
});