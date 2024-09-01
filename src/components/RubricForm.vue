<template>
  <Section :title="rubric.label">
    <PaperContainer class="flex flex-col gap-4">
      <RubricSliceSelector v-model="earnedSliceModel" :slices="rubric.slices" />
      <InputContainer label="Additional Comment">
        <textarea v-model="commentModel" rows="10" />
      </InputContainer>
      <InputContainer label="Common Deductions">
        <div class="flex flex-row flex-wrap gap-2 md:items-start">
          <button
              class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 inline-flex items-center gap-1 py-1 px-2.5 rounded-md font-medium w-fit"
               v-for="commonDeduction in rubric.commonDeductions" @click="() => appendCommonDeduction(commonDeduction)">
            <span>
              <PlusIcon class="size-4 leading-none" />
            </span>
            {{ commonDeduction }}
          </button>
        </div>
      </InputContainer>
      <ValidationDescriptor v-if="!isEarnedSliceValid" label="Earned Slice" message="Rubric slice is missing." />
    </PaperContainer>
  </Section>
</template>

<script setup lang="ts">

import {IRubric, IRubricSlice} from "../types.ts";
import {computed, watch} from "vue";
import Section from "./Section.vue";
import PaperContainer from "./PaperContainer.vue";
import InputContainer from "./InputContainer.vue";
import RubricSliceSelector from "./RubricSliceSelector.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import ValidationDescriptor from "./ValidationDescriptor.vue";

interface IRubricFormProps {
  rubric: IRubric;
}
const {rubric} = defineProps<IRubricFormProps>()

const earnedSliceModel = defineModel<IRubricSlice>('earnedSlice')
const commentModel = defineModel<string>('comment')

const appendCommonDeduction = (deduction: string) => {
  if (commentModel.value.length === 0) commentModel.value += deduction
  else commentModel.value = commentModel.value.trim() + ' ' + deduction;
}

const isEarnedSliceValid = computed(() => {
  return earnedSliceModel.value !== undefined
})

</script>

<style scoped>

</style>