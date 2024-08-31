<template>
  <label class="flex flex-col p-2 bg-neutral-100 rounded-md border-2 border-neutral-100 md:basis-1/3 has-[:checked]:bg-slate-100 has-[:checked]:border-slate-200" :for="slice.id">
    <input class="group outline-0 appearance-none hidden" type="radio" :value="slice" :id="slice.id"
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

  const earnedSliceModel = defineModel<IRubricSlice | undefined>()

</script>

<style scoped>

</style>