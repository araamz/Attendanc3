<template>
  <InputContainer label="Rubric Selection">
    <div class="flex flex-col gap-4 md:flex-row">
      <RubricSlice v-model="rubricSliceModel" v-for="slice in slices" :key="slice.id" :slice="slice" />
    </div>
  </InputContainer>
</template>

<script setup lang="ts">

import {IRubricSlice} from "../types.ts";
import RubricSlice from "./RubricSlice.vue";
import InputContainer from "./InputContainer.vue";

interface IRubricSliceSelectorProps {
  slices: Array<IRubricSlice>;
}
const {slices} = defineProps<IRubricSliceSelectorProps>()

const rubricSliceModel = defineModel<IRubricSlice | undefined>()

</script>

<style scoped>

</style>