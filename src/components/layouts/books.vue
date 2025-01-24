<script setup lang="ts">
defineProps<{
  filteredBooks: Record<string, bookData>;
}>()

</script>

<template>
  <ul class="w-full" >
    <li class="p-4 mb-4 border-2 border-layer rounded-2xl hover:bg-layer" v-for="(book, id) in filteredBooks" :key="id">
      <div class="flex justify-between items-start">
        <h4 class="desktop:max-w-[876px] tablet:max-w-[550px] mobile:max-w-[345px] max-w-[205px] mr-4 text-[16px] leading-5 break-words">{{ book.name }}</h4>
        <img class="cursor-pointer"
             src="@/assets/img/fileEdit.svg"
             alt="изменить_описание_книги"
        />
      </div>
      <div class="flex mt-2">
        <p class="max-w-[41%]">{{ book.author }}</p>
        <p class="desktop:ml-4 tablet:ml-4 mobile:ml-2 ml-2">{{ book.year }}</p>
        <p class="max-w-[41%] desktop:ml-4 tablet:ml-4 mobile:ml-2 ml-2">{{ book.genre }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
p {
  @apply font-normal text-sm leading-5 text-accent break-words
}
</style>