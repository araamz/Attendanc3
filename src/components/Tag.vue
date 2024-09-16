<template>
  <div class="bg-slate-200 px-2 py-1 rounded-md w-max h-min flex">
    <p class="text-xs font-medium leading-none text-slate-400 inline">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">

interface ITagProps {
  label: string;
}
const {label} = defineProps<ITagProps>()

</script>

<style scoped>

</style>