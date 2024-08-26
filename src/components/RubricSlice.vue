<template>
  <label class="flex flex-col p-2 bg-neutral-100 rounded-md border-2 border-neutral-100 md:basis-1/3" :for="slice.id">
    <input class="group outline-0 appearance-none hidden" type="radio" :id="slice.id" :value="slice"
           v-model="earnedSliceModel"/>
    <span class="font-semibold">
      {{slice.score}} pts.
    </span>
    <span class="font-medium">
      {{slice.label}}
    </span>
    <span class="text-sm">
      {{slice.description}}
    </span>
  </label>
</template>

<script setup lang="ts">

  import {IRubricSlice} from "../types.ts";
  import Input from "./InputContainer.vue";

  interface IRubricSliceProps {
    slice: IRubricSlice;
  }
  const {slice} = defineProps<IRubricSliceProps>()

  const earnedSliceModel = defineModel<IRubricSlice>()

</script>

<style scoped>

</style>