  <script setup lang="ts">
  import AppButton from "@/shared/ui/AppButton.vue";
  import {ref, computed, onMounted } from "vue";
  import AppDialog from "@/shared/ui/AppDialog.vue";
  import FormAdd from "@/features/add-book/formAdd.vue";
  import BooksList from "@/pages/home/booksList.vue";
  import { useBookStore} from "@/entities/book/bookStore.ts";
  import { type bookData } from "@/entities/book/bookTypes.ts";

  const bookStore = useBookStore()
  const dialogTarget = ref<InstanceType<typeof AppDialog>>()
  const screenWidth = ref(window.innerWidth)
  const isSearching = ref(false)

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
      return bookStore.books;
    }

    const query = searchQuery.value.toLowerCase();

    return Object.fromEntries(
        Object.entries(bookStore.books).filter(([, book]) => {
          const typedBook = book as bookData;
          return typedBook.name.toLowerCase().includes(query);
        })
    );
  });

  const updateWidth = () => {
    screenWidth.value = window.innerWidth
    if (screenWidth.value > 320) {
      isSearching.value = false;
    }
  }

  onMounted(() => {
    bookStore.loadBooks()
    window.addEventListener('resize', updateWidth)
    }
  )
  </script>

  <template>
  <div class="h-screen w-full flex flex-col">
    <div class="w-full py-4 flex flex-col items-center bg-layer">
      <div class="desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] flex w-[280px] flex-col justify-center items-center">
        <div class="flex desktop:justify-center tablet:justify-center mobile:justify-center justify-between w-[280px] pb-4">
          <img v-if="!isSearching"
               class="w-[55px] h-[41px]"
               src="../../public/logo.svg"
               alt="лого"
          />
          <div v-if="screenWidth >= 480 || isSearching" class="relative desktop:ml-[25px] tablet:ml-[25px] mobile:ml-[17px] ">
            <div class="absolute z-50 inset-y-0 left-0 pl-3 flex items-center">
              <img v-if="screenWidth >= 480" class="text-accent" src="../shared/icons/search.svg" alt=""/>
              <img v-if="isSearching"
                   class="w-[20px] cursor-pointer"
                   src="../shared/icons/xModal.svg"
                   alt="закрыть_поле_ввода"
                   @click="isSearching = !isSearching" />
            </div>
            <input v-if="isSearching || screenWidth >= 480"
                   class="relative z-0 desktop:w-[864px] tablet:w-[544px] mobile:w-[352px] w-[280px] h-[41px] pl-[36px]
                          text-[14px] leading-6 rounded-lg font-Inter
                          focus-visible:outline focus-visible:outline-green focus-visible:outline-2"
                   :placeholder="screenWidth >= 480 ? 'Найти ту самую книгу' : ''"
                   v-model="searchQuery"
            />
          </div>
          <button v-else-if="!isSearching"
                  class="w-[41px] flex items-center justify-center bg-white rounded-lg cursor-pointer"
                  @click="isSearching = !isSearching"
          >
            <img class="text-accent" src="../shared/icons/search.svg" alt=""/>
          </button>
        </div>
        <div class="flex justify-between w-full tablet:items-center">
          <div class="flex items-start w-full justify-start">
            <h1>Книги {{ searchQuery === '' ? 'в каталоге' : 'по запросу' }}</h1>
            <h1 class="ml-2 text-accent">{{ searchQuery === '' ? bookStore.getBookCount() : '«' + truncatedSearchQuery + '»'}}</h1>
          </div>
          <div class="min-w-[157px]" v-if="screenWidth >= 768">
            <AppButton :isAdd="true" img-name="fileAdd" text="Добавить книгу" @click="showDialog"/>
          </div>
        </div>
      </div>
    </div>

    <div class="relative max-w-full overflow-y-auto w-full mt-4 desktop:mb-4 tablet:mb-4 mobile:mb-14 mb-14 flex flex-col items-center">
      <div class="relative desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] w-[280px] flex flex-col items-center">
        <BooksList :filtered-books="filteredBooks"/>
        <div v-if="searchQuery && Object.keys(filteredBooks).length === 0" class="w-full flex items-start">
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