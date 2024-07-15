<script setup lang="ts">

  interface IScrollButtonProps {
    onclick: () => void;
    disabled?: boolean;
    label: string;
  }
  const {onclick, disabled, label} = defineProps<IScrollButtonProps>()

</script>

<template>
  <button :disabled="disabled" @click="onclick()" class="flex flex-row gap-1 text-neutral-400 hover:text-black items-center place-content-center my-4">
    <span class="[&>*]:size-4">
      <slot name="icon" />
    </span>
    <span class="font-medium text-sm md:text-md uppercase">
      {{ label }}
    </span>
  </button>
</template>

<style scoped>

</style>