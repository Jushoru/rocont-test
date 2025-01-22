<script setup lang="ts">

import AppButton from "@/components/app/AppButton.vue";
import {ref} from "vue";

const name = ref('')
const author = ref('')
const year = ref<number | null>(null)
const genre = ref('')
const isAgree = ref(false)

</script>

<template>
  <div class="w-[464px] bg-white p-8">
    <h1 class="">Добавить книгу</h1>
    <p class="mt-2">Заполните все поля и добавьте книгу в список</p>
    <form class="w-full mt-4" method="dialog">
      <div class="mb-2">
        <label class="inputLabel">
          Название
        </label>
        <input class="formInput"
               v-model="name"
               type="text"
               placeholder="Название произведения"
        />
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Автор
        </label>
        <input class="formInput"
               v-model="author"
               type="text"
               placeholder="Название произведения"
        />
      </div>
      <div class="mb-2">
        <label class="inputLabel">
          Год
        </label>
        <input class="formInput"
               v-model="year"
               type="text"
               placeholder="Название произведения"
        />
      </div>
      <div class="mb-4">
        <label class="inputLabel">
          Жанр
        </label>
        <input class="formInput"
               v-model="genre"
               type="text"
               placeholder="Название произведения"
        />
      </div>

      <div class="flex items-center mb-4">
        <input class="border-2" v-model="isAgree" type="checkbox" id="checkbox">
        <label class="ml-2 font-normal text-[10px] leading-[10px] text-accent"
               for="checkbox"
        >
          Я согласен с условиями <a class="underline underline-offset-[2.9px] hover:cursor-pointer">Политики конфиденциальности</a>
        </label>
      </div>

      <div class="ml-auto w-[114px]">
        <AppButton :is-add="true" img-name="fileAdd" text="Добавить" @click="formSubmit"/>
      </div>
    </form>
  </div>
</template>

<style scoped>
.inputLabel {
  @apply font-semibold text-sm leading-5
}

.formInput {
  @apply w-full h-[41px] px-3 mt-0.5 bg-layer rounded-lg text-sm leading-5 focus-visible:outline focus-visible:outline-green
}

h1 {
  @apply font-semibold text-xl leading-5
}

p {
  @apply font-normal text-sm leading-5 text-accent
}
</style>