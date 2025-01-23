<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import {ref, computed, onMounted } from "vue";
import DialogForm from "@/components/layouts/dialogForm.vue";
import FormAdd from "@/components/layouts/formAdd.vue";
import Books from "@/components/layouts/books.vue";
import { useSamplesStore } from "@/stores/samplesStore.ts";

const samplesStore = useSamplesStore()
const dialogTarget = ref<InstanceType<typeof DialogForm>>()
const screenWidth = ref(window.innerWidth)


const showDialog = () => dialogTarget.value?.show()
const searchQuery = ref('');

const truncatedSearchQuery = computed(() => {
  const maxLength = 20;
  return searchQuery.value.length > maxLength
      ? searchQuery.value.slice(0, maxLength) + '...'
      : searchQuery.value;
});

const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return samplesStore.books;
  }

  const query = searchQuery.value.toLowerCase();

  console.log(Object.fromEntries(
      Object.entries(samplesStore.books).filter(([, book]) =>
          book.name.toLowerCase().includes(query)
      )
  ))

  return Object.fromEntries(
      Object.entries(samplesStore.books).filter(([, book]) =>
          book.name.toLowerCase().includes(query)
      )
  );
});

const updateWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  samplesStore.loadBooks()
  window.addEventListener('resize', updateWidth)
  }
)
</script>

<template>
<div class="h-screen">
  <div class="w-full py-4 flex flex-col items-center bg-layer">
    <div class="flex flex-col justify-center items-center desktop:w-[1024px] tablet:w-[768px] mobile:w-[480px] w-[320px] px-10">
      <div class="flex justify-center pb-4">
        <img class="w-[55px] h-[41px]"
             src="@/assets/img/logo.svg"
             alt="лого"
        />
        <div class="relative desktop:ml-[25px] tablet:ml-[25px] mobile:ml-[17px] ">
          <div class="absolute z-50 inset-y-0 left-0 pl-3
                    flex items-center
                    pointer-events-none">
            <img class="text-gray-400 cursor-pointer" src="@/assets/img/search.svg" alt=""/>
          </div>
          <input class="relative z-0 desktop:w-[864px] tablet:w-[544px] mobile:w-[352px] w-[41px] h-[41px] pl-[36px]
                        text-[14px] leading-6 rounded-lg
                        focus-visible:outline focus-visible:outline-green focus-visible:outline-2"
                 :placeholder="screenWidth > 480 ? 'Найти ту самую книгу' : ''"
                 v-model="searchQuery"
          />
        </div>
      </div>
      <div class="flex justify-between desktop:w-full tablet:items-center tablet:w-[624px] mobile:w-[428px]">
        <div class="flex items-start w-full justify-start">
          <h1>Книги в каталоге</h1>
          <h1 class="ml-2 text-accent">{{ searchQuery === '' ? samplesStore.getBookCount() : '«' + truncatedSearchQuery + '»'}}</h1>
        </div>
        <div class="w-[157px]" v-if="screenWidth >= 768">
          <AppButton :isAdd="true" img-name="fileAdd" text="Добавить книгу" @click="showDialog"/>
        </div>
      </div>
    </div>
  </div>

  <div class="relative w-full pt-4 pb-4 h-[82%] flex flex-col items-center">
    <div class="relative w-[1024px] max-h-full flex flex-col items-center px-10 overflow-y-auto">
      <Books :filtered-books="filteredBooks"/>
      <div v-if="searchQuery && Object.keys(filteredBooks).length === 0" class="w-full flex items-start">
        <p class="text-[16px] text-accent leading-5">По вашему запросу ничего не найдено</p>
      </div>
    </div>
    <div class="fixed w-[468px] bottom-2" v-if="screenWidth < 768">
      <AppButton :isAdd="true" img-name="fileAdd" text="Добавить книгу" @click="showDialog"/>
    </div>
  </div>

  <DialogForm ref="dialogTarget">
    <FormAdd :dialog="dialogTarget" />
  </DialogForm>
</div>
</template>

<style scoped>
h1 {
  @apply font-semibold text-xl leading-5
}
</style>