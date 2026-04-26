<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import {ref, computed, onMounted } from "vue";
import HomeHeader from "@/components/home/homeHeader.vue";
import AppDialog from "@/components/AppDialog.vue";
import FormAdd from "@/features/add-book/formAdd.vue";
import BooksListA from "@/components/home/booksListA.vue";
import { useBookStore} from "@/entities/book/bookStore.ts";
import { type bookData } from "@/entities/book/bookTypes.ts";

const bookStore = useBookStore()
const dialogTarget = ref<InstanceType<typeof AppDialog>>()
const screenWidth = ref(window.innerWidth)
let lastWidth = window.innerWidth
const parentSearchQuery = ref("")

const showDialog = () => dialogTarget.value?.show()

const filteredBooks = computed(() => {
  if (!parentSearchQuery.value) {
    return bookStore.books;
  }

  const query = parentSearchQuery.value.toLowerCase();

  return Object.fromEntries(
      Object.entries(bookStore.books).filter(([, book]) => {
        const typedBook = book as bookData;
        return typedBook.name.toLowerCase().includes(query);
      })
  );
});

const updateWidth = () => {
  const newWidth = window.innerWidth
  if (newWidth !== lastWidth) {
    screenWidth.value = newWidth
    lastWidth = newWidth
  }
}

onMounted(() => {
      bookStore.getBooks()
      window.addEventListener('resize', updateWidth)
    }
)
</script>

<template>
  <div class="w-full">
    <HomeHeader
        @update:searchQuery="parentSearchQuery = $event"
        @add-book="showDialog"
    />
    <div class="relative max-w-full overflow-y-auto w-full mt-4 desktop:mb-4 tablet:mb-4 mobile:mb-14 mb-14 flex flex-col items-center">
      <div class="relative desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] w-[280px] flex flex-col items-center">
        <BooksListA :filtered-books="filteredBooks" :search-query="parentSearchQuery"/>
        <div v-if="parentSearchQuery && Object.keys(filteredBooks).length === 0" class="w-full flex items-start">
          <p class="text-[16px] text-accent leading-5">По вашему запросу ничего не найдено</p>
        </div>
      </div>
      <div class="fixed mobile:w-[448px] w-[304px] bottom-2" v-if="screenWidth < 768">
        <AppButton :isAdd="true" img-name="fileAdd" text="Добавить книгу" @click="showDialog"/>
      </div>
    </div>

    <AppDialog ref="dialogTarget">
      <FormAdd :dialog="dialogTarget" />
    </AppDialog>
  </div>
</template>

<style scoped>
h1 {
  @apply font-semibold text-xl leading-5
}
</style>