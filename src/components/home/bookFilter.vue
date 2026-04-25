<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "apply", filters: {
    author: string;
    genre: string;
    year: string;
    isRead: boolean;
    isFavorite: boolean;
  }): void;
}>();

const filters = ref({
  author: '',
  genre: '',
  year: '',
  isRead: false,
  isFavorite: false
});

const applyFilter = () => {
  emit('apply', { ...filters.value });

  if ((window as any).ym) {
    (window as any).ym(108437493, 'reachGoal', 'filter_applied', {
      filters: filters.value
    });
  }
};

const resetFilters = () => {
  filters.value = {
    author: '',
    genre: '',
    year: '',
    isRead: false,
    isFavorite: false
  };

  emit('apply', { ...filters.value });
};
</script>

<template>
  <div class="w-full bg-layer rounded-xl mb-4 p-3">

    <h3 class="text-lg font-semibold mb-2">Фильтры</h3>

    <div class="w-full flex desktop:flex-row tablet:flex-col mobile:flex-col flex-col gap-3 pb-2">
      <div class="w-full flex desktop:flex-row tablet:flex-row mobile:flex-row flex-col gap-3">
        <input
            type="text"
            v-model="filters.author"
            placeholder="Автор"
            class="min-w-[140px] max-w-[179px] h-[36px] px-3 border rounded-lg text-sm bg-white"
        />
        <input
            type="text"
            v-model="filters.genre"
            placeholder="Жанр"
            class="min-w-[140px] max-w-[179px] h-[36px] px-3 border rounded-lg text-sm bg-white"
        />
        <input
            type="number"
            v-model="filters.year"
            placeholder="Год"
            class="w-[90px] h-[36px] px-2 border rounded-lg text-sm bg-white"
        />
      </div>

      <div class="w-full flex desktop:flex-row tablet:flex-row mobile:flex-col flex-col gap-3">
        <div class="w-full flex gap-3">
          <label class="flex items-center gap-2 whitespace-nowrap">
            <input type="checkbox" v-model="filters.isRead" />
            <span class="text-sm">Прочитано</span>
          </label>

          <label class="flex items-center gap-2 whitespace-nowrap">
            <input type="checkbox" v-model="filters.isFavorite" />
            <span class="text-sm">Избранное</span>
          </label>
        </div>

        <div class="flex gap-2 shrink-0">
          <button
              @click="applyFilter"
              class="px-4 h-[36px] bg-green text-white rounded-lg hover:bg-greenHover transition"
          >
            Применить
          </button>
          <button
              @click="resetFilters"
              class="px-4 h-[36px] bg-red text-white rounded-lg hover:bg-redHover transition"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>