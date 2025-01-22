<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import Dialog from "@/components/app/Dialog.vue";
import { ref } from "vue";
import DialogForm from "@/components/layouts/dialogForm.vue";
import Form from "@/components/layouts/form.vue";

const dialogTarget = ref<InstanceType<typeof Dialog>>()

const showDialog = () => dialogTarget.value?.show()
</script>

<template>

  <div class="w-full px-10 py-4 flex flex-col items-center bg-layer">
    <div class="flex flex-col justify-center w-[1024px] px-10">

      <div class="flex justify-center pb-4">
        <img class="w-[55px] h-[41px]"
             src="@/assets/img/logo.svg"
             alt="лого"
        />
        <div class="relative ml-[25px]">
          <div class="absolute z-50 inset-y-0 left-0 pl-3
                    flex items-center
                    pointer-events-none">
            <img class="text-gray-400" src="@/assets/img/search.svg" alt=""/>
          </div>
          <input class="relative z-0 w-[54rem] h-[41px] pl-[36px] text-[14px] leading-6 rounded-lg
                    focus-visible:outline focus-visible:outline-green"
                 placeholder="Найти ту самую книгу"
          />
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center">
          <h1>Книги в каталоге</h1>
          <h1 class="ml-2 text-accent">{{ 3 }}</h1>
        </div>
        <div class="w-[157px]">
          <AppButton :isAdd="true" img-name="fileAdd" text="Добавить книгу" @click="showDialog"/>
        </div>
      </div>
    </div>
  </div>

  <DialogForm ref="dialogTarget">
    <Form/>
  </DialogForm>

</template>

<style scoped>

h1 {
  @apply font-semibold text-xl leading-5
}

</style>