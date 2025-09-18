import type { bookFields } from "./bookTypes.ts";

const currentData = new Date()

interface outErrors {
    hasError: boolean;
    newErrors: Record<bookFields, string>;
}

export function bookValidator(name: string, author: string, genre: string, year: string, errors: Record<bookFields, string>): outErrors {

    let hasError = false

    if (!name.trim()) {
        errors.name = 'Введите название';
        hasError = true;
    } else if (name.length > 300) {
        errors.name = 'Слишком длинное название (макс. 300 символов)';
        hasError = true;
    }

    if (!author.trim()) {
        errors.author = 'Введите автора';
        hasError = true;
    } else if (author.length > 60) {
        errors.author = 'Слишком длинное имя (макс. 60 символов)';
        hasError = true;
    }

    if (!year.trim()) {
        errors.year = 'Введите год';
        hasError = true;
    } else if (isNaN(Number(year))) {
        errors.year = 'Год должен быть числом';
        hasError = true;
    } else if (Number(year) > currentData.getFullYear() || Number(year) < 1) {
        errors.year = `Год должен быть в диапазоне от 1 до ${currentData.getFullYear()}`;
        hasError = true;
    }

    if (!genre.trim()) {
        errors.genre = 'Введите жанр';
        hasError = true;
    } else if (genre.length > 60) {
        errors.genre = 'Слишком длинное название (макс. 60 символов)';
        hasError = true;
    }

    if (hasError) {
        return {
            hasError: true,
            newErrors: errors,
        }
    } else {
        return {
            hasError: false,
            newErrors: errors,
        }
    }
}