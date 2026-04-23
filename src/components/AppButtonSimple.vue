<script setup lang="ts">
defineProps<{
  isRed: boolean;
  text: string;
}>()
</script>

<template>

  <button class="w-full h-[32px] rounded-lg flex items-center justify-center text-[14px] leading-5 text-white group"
          :class="isRed ?
          'bg-red hover:bg-redHover' :
          'bg-[#E1E7EF] hover:bg-[#eaeef4]'"
          type="button"
          @click="$emit('btnClick')"
  >
    <span class="ml-1"
          :class="isRed ?
          'text-white' :
          'text-[#8E959F]'"
    >{{ text }}</span>
  </button>
</template>
