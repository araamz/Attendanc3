<template>
  <button :form="form" :type="type" @click="onclick ? onclick() : undefined" :disabled="!!disableOption" :class="[backgroundColor, 'flex flex-row items-center rounded-md border-2 px-2.5 py-1.5 gap-1 disabled:bg-white disabled:border-neutral-200 disabled:text-neutral-400 hover:border-slate-600 hover:bg-slate-600 hover:text-white transition-colors',
  'disabled:bg-none']">
    <span class="font-medium leading-none">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">

  import {computed} from "vue";

  interface IButtonProps {
    onclick?: Function;
    disableOption?: boolean;
    highlighted?: boolean;
    type?: 'button' | 'submit';
    form?: string;
  }
  const {type, onclick, disableOption, highlighted} = defineProps<IButtonProps>()

  const backgroundColor = computed(() => highlighted ? 'bg-slate-200 border-slate-200 text-slate-500' : 'bg-neutral-100 border-neutral-100 text-neutral-400')

</script>

<style scoped>

</style>