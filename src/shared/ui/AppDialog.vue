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
  <dialog class="relative desktop:min-h-min tablet:min-h-min mobile:min-h-screen min-h-screen desktop:rounded-2xl tablet:rounded-2xl text-text
                 desktop:min-w-min tablet:min-w-min mobile:min-w-screen min-w-[100vw] desktop:m-auto tablet:m-auto mobile:m-0 m-0"
          ref="dialogRef"
          @click="closeFromEvent"
  >
    <div class="desktop:p-8 tablet:p-8 px-auto py-5">
      <button class="absolute w-6 h-6 desktop:right-8 tablet:right-8 mobile:right-4 right-4 desktop:top-8 tablet:top-8 mobile:top-4 top-4" @click="closeDialog">
        <img class=""
             src="../icons/xModal.svg"
             alt="закрыть_модальное_окно">
      </button>
      <slot/>
    </div>
  </dialog>
</template>
<style>
dialog::before,
dialog::after {
  content: none;
  padding: 0

}
</style>
