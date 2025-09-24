<script setup lang="ts">
import AppButtonSimple from "@/shared/ui/AppButtonSimple.vue";

defineProps<{
  title: string;
  message: string;
}>();
</script>

<template>
  <div class="desktop:w-[400px] tablet:w-[400px] mobile:w-[360px] w-[280px] bg-white mx-auto">
    <h1 class="max-w-[93%]">{{ title }}</h1>
    <p class="mt-2 text-pretty">{{ message }}</p>
    <div class="mt-4 flex justify-end gap-2">
      <div class="w-[80px]">
        <AppButtonSimple :is-red="false" text="Нет" @btn-click="$emit('rejectClick')"/>
      </div>
      <div class="w-[80px]">
        <AppButtonSimple :is-red="true" text="Да" @btn-click="$emit('acceptClick')"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  @apply font-semibold text-xl leading-5
}

p {
  @apply font-normal text-sm leading-5 text-accent
}
</style>