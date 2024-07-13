<script setup lang="ts">

interface IIconButtonProps {
  onclick: () => void;
  disabled?: boolean;
}
const {onclick, disabled} = defineProps<IIconButtonProps>()
</script>

<template>
  <button class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full hover:bg-black hover:text-white disabled:bg-red-100 disabled:text-red-300" @click="onclick" :disabled="disabled">
    <span class="[&>*]:size-4">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>

</style>
