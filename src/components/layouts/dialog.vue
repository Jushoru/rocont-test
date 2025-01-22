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
  <dialog class="w-[464px] h-[522px] rounded-2xl bg-white p-8"
          ref="dialogRef"
          @click="closeFromEvent"
  >
    <slot/>
  </dialog>
</template>