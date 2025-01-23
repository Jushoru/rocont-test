<script setup lang="ts">
defineProps<{
  filteredBooks: Record<string, bookData>;
}>()

</script>

<template>
  <ul class="w-full" >
    <li class="p-4 mb-4 border-2 border-layer rounded-2xl hover:bg-layer" v-for="(book, id) in filteredBooks" :key="id">
      <div class="flex justify-between items-start">
        <h4 class="max-w-[876px] mr-4 text-[16px] leading-5 break-words">{{ book.name }}</h4>
        <img class="cursor-pointer"
             src="@/assets/img/fileEdit.svg"
             alt="изменить_описание_книги"
        />
      </div>
      <div class="flex mt-2">
        <p>{{ book.author }}</p>
        <p class="ml-4">{{ book.year }}</p>
        <p class="ml-4">{{ book.genre }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
p {
  @apply font-normal text-sm leading-5 text-accent
}
</style>