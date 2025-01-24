<script setup lang="ts">
import {ref} from "vue";

const dialogRef = ref<HTMLDialogElement | null>(null);
const showDialog = () => dialogRef.value?.showModal();
const closeDialog = () => dialogRef.value?.close();

defineExpose ({
  show: showDialog,
  close: closeDialog,
});

function closeFromEvent(e: Event): void {
  if (e.currentTarget === e.target) {
    closeDialog();
  }
}
</script>

<template>
  <dialog class="relative desktop:h-min tablet:h-min mobile:h-screen h-screen desktop:rounded-2xl tablet:rounded-2xl text-text
                 desktop:w-min tablet:w-min mobile:w-screen w-screen desktop:m-auto tablet:m-auto mobile:m-0 m-0"
          ref="dialogRef"
          @click="closeFromEvent"
  >
    <button class="absolute w-6 h-6 right-8 top-8" @click="closeDialog">
      <img class=""
           src="@/assets/img/xModal.svg"
           alt="закрыть_модальное_окно">
    </button>
    <slot/>
  </dialog>
</template>
<style>
dialog::before,
dialog::after {
  content: none;
  padding: 0

}
</style>
