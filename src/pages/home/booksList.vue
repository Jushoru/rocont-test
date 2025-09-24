<script setup lang="ts">
import {ref} from "vue";
import AppDialog from "@/shared/ui/AppDialog.vue";
import FormEdit from "@/features/edit-book/formEdit.vue";
import {type bookData} from "@/entities/book/bookTypes";

defineProps<{
  filteredBooks: Record<string, bookData>;
}>()

// TODO: не нравится мне подобное определение editedBook
const editedBook = ref<bookData>({
  name: '',
  author: '',
  genre: '',
  year: '',
});
const editedBookId = ref<string>('');
const dialogEditTarget = ref<InstanceType<typeof AppDialog>>()

const showEditDialog = (book: bookData, id: string) => {
  editedBook.value = book;
  editedBookId.value = id;
  dialogEditTarget.value?.show()
}

</script>

<template>
  <ul class="w-full" >
    <li class="p-4 mb-4 border-2 border-layer rounded-2xl hover:bg-layer" v-for="(book, id) in filteredBooks" :key="id">
      <div class="flex justify-between items-start">
        <h4 class="desktop:max-w-[876px] tablet:max-w-[550px] mobile:max-w-[345px] max-w-[205px] mr-4 text-[16px] leading-5 break-words">{{ book.name }}</h4>
        <img class="cursor-pointer"
             src="../../shared/icons/fileEdit.svg"
             alt="изменить_описание_книги"
             @click="showEditDialog(book, id)"
        />
      </div>
      <div class="flex mt-2">
        <p class="max-w-[41%]">{{ book.author }}</p>
        <p class="desktop:ml-4 tablet:ml-4 mobile:ml-2 ml-2">{{ book.year }}</p>
        <p class="max-w-[41%] desktop:ml-4 tablet:ml-4 mobile:ml-2 ml-2">{{ book.genre }}</p>
      </div>
    </li>
  </ul>
  <AppDialog ref="dialogEditTarget">
    <FormEdit :dialog="dialogEditTarget" :bookData="editedBook" :id="editedBookId"/>
  </AppDialog>
</template>

<style scoped>
p {
  @apply font-normal text-sm leading-5 text-accent break-words
}

h1 {
  @apply font-semibold text-xl leading-5
}
</style>