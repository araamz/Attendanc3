<template>
  <div class="flex flex-row items-center gap-1.5 text-red-400">
    <span>
      <ExclamationTriangleIcon class="size-3.5" />
    </span>
    <p class="text-xs">
      <span class="font-semibold">{{label}}: </span>{{message}}
    </p>
  </div>
</template>

<script setup lang="ts">

import {ExclamationTriangleIcon} from "@heroicons/vue/16/solid";

interface IValidationDescriptorProps {
  label: string;
  message: string;
}
const {label, message} = defineProps<IValidationDescriptorProps>()

</script>

<style scoped>

</style>