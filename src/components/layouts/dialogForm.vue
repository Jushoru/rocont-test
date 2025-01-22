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
  <dialog class="rounded-2xl text-text"
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