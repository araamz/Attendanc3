<script setup lang="ts">
  interface IDescriptorProps {
    label: string;
    value: string;
  }
  const {label, value} = defineProps<IDescriptorProps>();
</script>

<template>
  <div class="flex flex-row justify-between items-center py-0.5">
    <p class='text-xs font-medium text-neutral-400 uppercase'>
      {{ label }}
    </p>
    <p class='text-sm font-semibold text-black'>
      {{ value }}
    </p>
  </div>
</template>