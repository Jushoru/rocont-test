<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  isAdd: boolean;
  imgName?: string;
  text: string;
}>()

const imgUrl = computed(
    () => props.imgName
)
</script>

<template>
  <button class="w-full h-[41px] rounded-lg flex items-center justify-center text-[14px] leading-5 text-white group"
          :class="isAdd ?
          'bg-green hover:bg-greenHover' :
          'bg-red hover:bg-redHover'"
          type="button"
          @click="$emit('btnClick')"
  >
    <svg class="w-[20px] h-[20px] mr-[0.5px] opacity-50 group-hover:opacity-100"
         :aria-label="`кнопка ${text}`"
    >
      <use :href="`/sprite.svg#${imgUrl}`" />
    </svg>

    <span class="ml-1">{{ text }}</span>
  </button>
</template>
