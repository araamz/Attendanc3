<template>
  <button :form="form" :type="type" @click="onclick ? onclick() : undefined" :disabled="disabled" :class="[backgroundColor, 'flex flex-row items-center rounded-md px-3 py-2 gap-1 hover:bg-slate-600 hover:text-white transition-colors']">
    <span class="font-medium leading-none">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">

  import {computed} from "vue";

  interface IButtonProps {
    onclick?: Function;
    disabled?: boolean;
    highlighted?: boolean;
    type?: 'button' | 'submit';
    form?: string;
  }
  const {type, onclick, disabled, highlighted} = withDefaults(defineProps<IButtonProps>(), {
    highlighted: false,
    disabled: false,
    button: 'button'
  })

  const backgroundColor = computed(() => highlighted ? 'bg-slate-200 text-slate-500' : 'bg-neutral-100 text-neutral-400')

</script>

<style scoped>

</style>