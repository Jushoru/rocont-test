<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppButton from "@/components/AppButton.vue";

const router = useRouter();

function startWork() {
  if ((window as any).ym) {
    (window as any).ym(108437493, "reachGoal", "welcome_page_continue");
  }

  localStorage.setItem("visited", "true");
  router.replace("/home");
}
</script>

<template>
  <div class="w-full h-full py-4 desktop:pt-0 tablet:pt-0 pt-8 flex flex-col items-center desktop:justify-center
              tablet:justify-center justify-start bg-layer"
  >
    <div class="w-full max-w-[515px] p-4 flex flex-col justify-center items-center">
      <h1 class="text-2xl mb-8 font-bold text-center">Добро пожаловать в мини-приложение:<br>«Мои книги»!</h1>
      <div class="w-full flex flex-col items-start">
        <p class="mb-2 text-left text-md">"Мои книги" представляет собой минималистичное приложение по ведению
          списка литературы.<br>Здесь вы можете:
        </p>
        <ul class="list-disc list-inside mb-8 text-md">
          <li>Просматривать список книг</li>
          <li>Искать книги по названию</li>
          <li>Добавлять новые книги</li>
          <li>Отмечать книги - прочитанными</li>
          <li>Отмечать избранные книги</li>
          <li>Редактировать и удалять книги</li>
        </ul>
      </div>
      <div class="min-w-[157px]">
          <AppButton :isAdd="true" text="Начать работу" @btn-click="startWork" />
      </div>
    </div>
  </div>
</template>