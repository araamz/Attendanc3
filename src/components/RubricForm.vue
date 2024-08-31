<template>
  <Section :title="rubric.label">
    <PaperContainer class="flex flex-col gap-4">
      <RubricSliceSelector v-model="rubricFormState.earnedSlice.value" :slices="rubric.slices" />
      <InputContainer label="Additional Comment">
        <textarea v-model="rubricFormState.comment.value" rows="10" />
      </InputContainer>
      <InputContainer label="Common Deductions">
        <div class="flex flex-row flex-wrap gap-2 md:items-start">
          <button
              class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 inline-flex items-center gap-1 py-1 px-2.5 rounded-md font-medium w-fit"
              :for="rubric.commonDeductions" v-for="commonDeduction in rubric.commonDeductions" :onclick="() => appendCommonDeduction(commonDeduction)">
            <span>
              <PlusIcon class="size-4 leading-none" />
            </span>
            {{ commonDeduction }}
          </button>
        </div>
      </InputContainer>
      <ValidationDescriptor  v-if="!isEarnedSliceValid" label="Earned Slice" message="Rubric slice is missing." />
    </PaperContainer>
  </Section>
</template>

<script setup lang="ts">

import {IFormData, IRubric, IRubricGrade, IRubricSlice, IStudent} from "../types.ts";
import {reactive, ref, Ref, computed} from "vue";
import Section from "./Section.vue";
import PaperContainer from "./PaperContainer.vue";
import RubricGroupSelector from "./RubricGroupSelector.vue";
import InputContainer from "./InputContainer.vue";
import RubricSliceSelector from "./RubricSliceSelector.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import VerticalStack from "./VerticalStack.vue";
import ValidationDescriptor from "./ValidationDescriptor.vue";

interface IRubricFormProps {
  rubric: IRubric;
}
const {rubric} = defineProps<IRubricFormProps>()

interface IRubricFormState {
  earnedSlice: Ref<IRubricSlice | undefined>;
  comment: Ref<string>;
}
const rubricFormState: IRubricFormState = {
  earnedSlice: ref<IRubricSlice | undefined>(undefined),
  comment: ref<string>('')
}

interface IRubricGradeValidation {
  earnedSlice: string | null;
}

const isEarnedSliceValid = computed(() => rubricFormState.earnedSlice.value !== undefined)

interface IRubricFormEmits {
  (event: 'submit', data: IFormData<IRubricGrade, IRubricGradeValidation>): void;
}
const emit = defineEmits<IRubricFormEmits>()

const appendCommonDeduction = (deduction: string) => {
  if (rubricFormState.comment.value.length === 0) rubricFormState.comment.value += deduction
  else rubricFormState.comment.value = rubricFormState.comment.value.trim() + ' ' + deduction;
}

</script>

<style scoped>

</style>