<template>
  <label :class="[label !== null && 'flex flex-col gap-1 rounded-md',
  'w-full [&_input]:w-full [&_input]:px-2 [&_input]:py-1.5 [&_input]:appearance-none [&_input]:outline-0 [&_input]:rounded-md [&_input]:bg-neutral-100 [&_input:focus]:bg-slate-100 [&_input:focus]:outline-0',
  'w-full [&_textarea]:w-full [&_textarea]:px-2 [&_textarea]:py-1.5 [&_textarea]:appearance-none [&_textarea]:outline-0 [&_textarea]:rounded-md [&_textarea]:bg-neutral-100 [&_textarea:focus]:bg-slate-100 [&_textarea:focus]:outline-0 [&_textarea]:resize-none']">
    <span class="text-xs font-semibold text-neutral-400 uppercase" v-if="label !== null">
      {{label}}
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">

  interface IInputProps {
    label?: string | null;
  }
  const {label} = withDefaults(defineProps<IInputProps>(), {
    label: null,
  })

</script>

<style scoped>

</style>