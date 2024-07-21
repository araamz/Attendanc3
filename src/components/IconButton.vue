<script setup lang="ts">
interface IIconButtonProps {
  onclick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  form?: string;
}
const {onclick, disabled, type} = defineProps<IIconButtonProps>()

</script>

<template>
  <button :type="type ? type : 'button'" :form="form ? form: undefined" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full hover:bg-slate-600 hover:text-white disabled:bg-red-100 disabled:text-red-300 transition-colors" @click="onclick" :disabled="disabled">
    <span class="[&>*]:size-4">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>

</style>
