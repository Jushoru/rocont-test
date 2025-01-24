<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import {ref} from "vue";
import { useSamplesStore } from "@/stores/samplesStore.ts";

const props = defineProps<{
  dialog: InstanceType<typeof HTMLDialogElement> | undefined
}>();

const samplesStore = useSamplesStore()
const name = ref('')
const author = ref('')
const year = ref('')
const genre = ref('')
const isAgree = ref(false)

const currentData = new Date()

const errors = ref({
  name: '',
  author: '',
  year: '',
  genre: '',
});

const formSubmit = () => {

  errors.value = {
    name: '',
    author: '',
    year: '',
    genre: '',
  };

  let hasError = false

  if (!name.value.trim()) {
    errors.value.name = 'Введите название';
    console.log(errors.value.name)
    hasError = true
  } else if (name.value.length > 300) {
    errors.value.name = 'Слишком длинное название (макс. 300 символов)';
    hasError = true
  }

  if (!author.value.trim()) {
    errors.value.author = 'Введите автора';
    hasError = true
  } else if (author.value.length > 60) {
    errors.value.author = 'Слишком длинное имя (макс. 60 символов)';
    hasError = true
  }

  if (!year.value.trim()) {
    errors.value.year = 'Введите год';
    hasError = true
  } else if (isNaN(Number(year.value))) {
    errors.value.year = 'Год должен быть числом';
    hasError = true
  } else if (Number(year.value) > currentData.getFullYear() || Number(year.value) < 1) {
    errors.value.year = `Год должен быть в диапазоне от 1 до ${currentData.getFullYear()}`;
    hasError = true
  }

  if (!genre.value.trim()) {
    errors.value.genre = 'Введите жанр';
    hasError = true
  } else if (genre.value.length > 60) {
    errors.value.genre = 'Слишком длинное название (макс. 60 символов)';
    hasError = true
  }

  if (!hasError && isAgree.value) {
    samplesStore.loadBooks()

    const newId = Object.keys(samplesStore.books).length + 1

    samplesStore.books[newId] = {
      name: name.value,
      author: author.value,
      year: year.value,
      genre: genre.value
    };

    localStorage.setItem('books', JSON.stringify(samplesStore.books))
    // localStorage.clear()
    samplesStore.loadBooks()
    props.dialog?.close();

    name.value = ''
    author.value = ''
    year.value = ''
    genre.value = ''

    isAgree.value = false
  }
};

const clearError = (field: keyof typeof errors.value) => {
  errors.value[field] = '';
};

</script>

<template>
  <div class="desktop:w-[464px] tablet:w-[464px] mobile:w-[424px] w-[280px] bg-white desktop:m-8 tablet:m-8 mx-auto my-5">
    <h1 class="">Добавить книгу</h1>
    <p class="mt-2 text-pretty">Заполните все поля и добавьте книгу в список</p>
    <form class="w-full mt-4">
      <div class="mb-2">
        <label class="inputLabel">
          Название
        </label>
        <input class="formInput"
               :class="errors.name ? 'outline outline-red outline-2' : ''"
               v-model="name"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('name')"
        />
        <span v-if="errors.name" class="inputError ml-3">{{errors.name}}</span>
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Автор
        </label>
        <input class="formInput"
               :class="errors.author ? 'outline outline-red outline-2' : ''"
               v-model="author"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('author')"
        />
        <span v-if="errors.author" class="inputError ml-3">{{errors.author}}</span>
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Год
        </label>
        <input class="formInput"
               :class="errors.year ? 'outline outline-red outline-2' : ''"
               v-model="year"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('year')"
        />
        <span v-if="errors.year" class="inputError ml-3">{{errors.year}}</span>
      </div>
      <div class="mb-4">
        <label class="inputLabel">
          Жанр
        </label>
        <input class="formInput"
               :class="errors.genre ? 'outline outline-red outline-2' : ''"
               v-model="genre"
               type="text"
               placeholder="Название произведения"
               @focusin="clearError('genre')"
        />
        <span v-if="errors.genre" class="inputError ml-3">{{errors.genre}}</span>
      </div>

      <div class="flex items-center mb-4">
        <input class="border-2" v-model="isAgree" type="checkbox" id="checkbox">
        <label class="ml-2 font-normal text-[10px] leading-[10px] text-accent"
               for="checkbox"
        >
          Я согласен с условиями <a class="underline underline-offset-[2.9px] hover:cursor-pointer">Политики конфиденциальности</a>
        </label>
      </div>

      <div class="ml-auto desktop:w-[114px] tablet:w-[114px] mobile:w-full w-full">
        <AppButton :is-add="true" img-name="fileAdd" text="Добавить" @btn-click="formSubmit" />
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