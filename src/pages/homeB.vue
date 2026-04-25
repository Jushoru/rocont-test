<script setup lang="ts">
import AppButton from "@/components/AppButton.vue";
import {ref, computed, onMounted} from "vue";
import BookFilter from "@/components/home/bookFilter.vue";
import HomeHeader from "@/components/home/homeHeader.vue";
import AppDialog from "@/components/AppDialog.vue";
import FormAdd from "@/features/add-book/formAdd.vue";
import BooksList from "@/components/home/booksList.vue";
import { useBookStore} from "@/entities/book/bookStore.ts";
import { type bookData } from "@/entities/book/bookTypes.ts";

type Filters = {
  author: string;
  genre: string;
  year: string;
  isRead: boolean;
  isFavorite: boolean;
};

const bookStore = useBookStore()
const dialogTarget = ref<InstanceType<typeof AppDialog>>()
const screenWidth = ref(window.innerWidth)
let lastWidth = window.innerWidth
const parentSearchQuery = ref("")

const activeFilters = ref<Filters>({
  author: "",
  genre: "",
  year: "",
  isRead: false,
  isFavorite: false
});

const showDialog = () => dialogTarget.value?.show()

const handleFilter = (filters: Filters) => {
  activeFilters.value = filters;
};

const filteredBooks = computed(() => {
  let books = Object.entries(bookStore.books);

  const f = activeFilters.value;

  books = books.filter(([, book]) => {
    const b = book as bookData;

    if (
        parentSearchQuery.value &&
        !b.name.toLowerCase().includes(parentSearchQuery.value.toLowerCase())
    ) {
      return false;
    }

    if (
        f.author &&
        !b.author.toLowerCase().includes(f.author.toLowerCase())
    ) {
      return false;
    }

    if (
        f.genre &&
        !b.genre.toLowerCase().includes(f.genre.toLowerCase())
    ) {
      return false;
    }

    if (
        f.year &&
        !b.year.toString().includes(f.year.toString())
    ) {
      return false;
    }

    if (f.isRead && !b.isRead) return false;
    if (f.isFavorite && !b.isFavorite) return false;

    return true;
  });

  return Object.fromEntries(books);
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
    <HomeHeader @update:searchQuery="parentSearchQuery = $event"/>
    <div class="relative max-w-full overflow-y-auto w-full mt-4 desktop:mb-4 tablet:mb-4 mobile:mb-14 mb-14 flex flex-col items-center">
      <div class="relative desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] w-[280px] flex flex-col items-center">
        <BookFilter @apply="handleFilter" />
        <BooksList :filtered-books="filteredBooks" :search-query="parentSearchQuery"/>
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