<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";
import AppDialog from "@/shared/ui/AppDialog.vue";
import {ref, watch} from "vue";
import { useBookStore } from "@/entities/book/bookStore";
import { bookValidator } from "@/entities/book/bookValidation";
import {type bookData } from "@/entities/book/bookTypes";

const props = defineProps<{
  dialog: InstanceType<typeof AppDialog> | undefined;
  bookData: bookData;
  id: string;
}>();

const bookStore = useBookStore()
const name = ref(props.bookData.name)
const author = ref(props.bookData.author)
const genre = ref(props.bookData.genre)
const year = ref(props.bookData.year)

watch(() => props.bookData, (newBook) => {
  name.value = newBook.name
  author.value = newBook.author
  genre.value = newBook.genre
  year.value = newBook.year
}, { immediate: true, deep: true })

const formSubmit = () => {

  bookStore.clearErrors()

  let validation = bookValidator(name.value, author.value, genre.value, year.value, bookStore.errors)

  if (!validation.hasError) {
    bookStore.loadBooks()

    const newId = props.id

    bookStore.books[newId] = {
      name: name.value,
      author: author.value,
      year: year.value,
      genre: genre.value
    };

    localStorage.setItem('books', JSON.stringify(bookStore.books))
    bookStore.loadBooks()
    props.dialog?.close();
  } else {
    bookStore.setErrors(validation.newErrors)
  }
};

const clearError = (field: keyof typeof bookStore.errors) => {
  bookStore.errors[field] = '';
};

</script>

<template>
  <div class="desktop:w-[464px] tablet:w-[464px] mobile:w-[424px] w-[280px] bg-white">
    <h1 class="">Изменение</h1>
    <p class="mt-2 text-pretty">Вы можете изменить поля уже созданной книги</p>
    <form class="w-full mt-4">
      <div class="mb-2">
        <label class="inputLabel">
          Название
        </label>
        <input class="formInput"
               :class="bookStore.errors.name ? 'outline outline-red outline-2' : ''"
               v-model="name"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('name')"
        />
        <span v-if="bookStore.errors.name" class="inputError ml-3">{{bookStore.errors.name}}</span>
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Автор
        </label>
        <input class="formInput"
               :class="bookStore.errors.author ? 'outline outline-red outline-2' : ''"
               v-model="author"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('author')"
        />
        <span v-if="bookStore.errors.author" class="inputError ml-3">{{bookStore.errors.author}}</span>
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Год
        </label>
        <input class="formInput"
               :class="bookStore.errors.year ? 'outline outline-red outline-2' : ''"
               v-model="year"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('year')"
        />
        <span v-if="bookStore.errors.year" class="inputError ml-3">{{bookStore.errors.year}}</span>
      </div>
      <div class="mb-4">
        <label class="inputLabel">
          Жанр
        </label>
        <input class="formInput"
               :class="bookStore.errors.genre ? 'outline outline-red outline-2' : ''"
               v-model="genre"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('genre')"
        />
        <span v-if="bookStore.errors.genre" class="inputError ml-3">{{bookStore.errors.genre}}</span>
      </div>

      <div class="ml-auto desktop:w-[114px] tablet:w-[114px] mobile:w-full w-full">
        <AppButton :is-add="true" img-name="fileAdd" text="Сохранить" @btn-click="formSubmit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.inputLabel {
  @apply font-semibold text-sm leading-5
}

.inputError {
  @apply text-[12px] text-red leading-5
}

.formInput {
  @apply w-full h-[41px] px-3 mt-0.5 bg-layer rounded-lg text-sm leading-5
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-green
}

h1 {
  @apply font-semibold text-xl leading-5
}

p {
  @apply font-normal text-sm leading-5 text-accent
}
</style>