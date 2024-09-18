<template>
  <div class="w-full h-full text-neutral-600 p-10 flex flex-col items-center gap-2 md:px-10 md:w-[500px] md:mx-auto">
    <ExclamationTriangleIcon class="size-20" />
    <div class="flex flex-col">
      <p class="text-lg text-center">
        {{message}}
      </p>
      <p class="underline font-medium text-center">
        <slot name="routerLink" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

  import {ExclamationTriangleIcon} from "@heroicons/vue/24/solid";

  interface IPlaceholderMessage {
    message: string;
  }
  const {message} = defineProps<IPlaceholderMessage>()

</script>

<style scoped>

</style>