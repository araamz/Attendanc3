<template>
  <label :class="[label !== null && 'flex flex-col gap-1 rounded-md', 'w-full [&_input]:w-full [&_input]:px-2 [&_input]:py-1.5 [&_input]:rounded-md [&_input]:bg-neutral-100 [&_input:focus]:bg-slate-100 [&_input:focus]:outline-0']">
    <span class="text-xs font-semibold text-neutral-400 uppercase" v-if="label !== null">
      {{label}}
    </span>
    <input v-if="type === 'text'" :placeholder="placeholder" :type="type" v-model="model" />
    <input v-if="type === 'number'" :placeholder="placeholder" :type="type" v-model.number="model" />
  </label>
</template>

<script setup lang="ts">

  interface IInputProps {
    label?: string | null;
    type: 'text' | 'number';
    placeholder: string | undefined;
  }
  const {label, type, placeholder} = withDefaults(defineProps<IInputProps>(), {
    label: null,
    type: 'text',
    placeholder: undefined,
  })

  const model = defineModel()

</script>

<style scoped>

</style>