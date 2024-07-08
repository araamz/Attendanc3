<script setup lang="ts">

interface IButtonProps {
  label: string;
  onclick: () => void;
  disabled?: boolean;
}
const {label} = defineProps<IButtonProps>()
</script>

<template>
  <button class="text-xs border-2 border-neutral-300 text-neutral-400 hover:border-slate-600 hover:bg-slate-600 hover:text-white px-2 py-1 font-medium rounded-md flex flex-row items-center gap-0.5" :label="label" :onclick="onclick" :disabled="disabled">
    <span class="[&>*]:size-4">
      <slot name="icon" />
    </span>
    {{label}}
  </button>
</template>

<style scoped>

</style>
