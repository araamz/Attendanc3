<template>
  <label class="flex flex-col gap-1">
    <span v-if="label !== ''">
      {{label}}
    </span>
    <input v-if="type === 'text'" :placeholder="placeholder" :type="type" v-model="model" />
    <input v-if="type === 'number'" :placeholder="placeholder" :type="type" v-model.number="model" />
  </label>
</template>

<script setup lang="ts">

  interface IInputProps {
    label?: string;
    type: 'text' | 'number';
    placeholder: string;
  }
  const {label, type, placeholder} = defineProps<IInputProps>()

  const model = defineModel()

</script>

<style scoped>

</style>