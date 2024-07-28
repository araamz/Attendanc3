<template>
  <button @click="onclick()" class="aspect-square">
    <PaperContainer class="h-full flex flex-col gap-4 text-neutral-300 place-items-center place-content-center rounded-md hover:text-slate-600 transition-colors">
      <span class="[&>*]:size-20">
        <slot name="icon" />
      </span>
      <p class="font-medium uppercase">
        {{ label }}
      </p>
    </PaperContainer>
  </button>
</template>

<script setup lang="ts">

import PaperContainer from "./PaperContainer.vue";

interface IGridButtonProps {
  label: string;
  onclick: Function;
}
const {label, onclick} = defineProps<IGridButtonProps>()

</script>

<style scoped>

</style>