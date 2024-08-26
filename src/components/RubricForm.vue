<template>
  <Section :title="rubric.label">
    <PaperContainer>
      <RubricSliceSelector v-model="rubricFormState.earnedSlice.value" :slices="rubric.slices" />
      <InputContainer>
        <textarea />
      </InputContainer>
      <div>
        <button
            class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 grow flex justify-center p-1.5 rounded-md font-medium"
            :for="rubric.commonDeductions" v-for="commonDeduction in rubric.commonDeductions">
        {{ commonDeduction }}
        </button>
      </div>
    </PaperContainer>
  </Section>
</template>

<script setup lang="ts">

import {IFormData, IRubric, IRubricGrade, IRubricSlice, IStudent} from "../types.ts";
import {reactive, ref, Ref} from "vue";
import Section from "./Section.vue";
import PaperContainer from "./PaperContainer.vue";
import RubricGroupSelector from "./RubricGroupSelector.vue";
import InputContainer from "./InputContainer.vue";
import RubricSliceSelector from "./RubricSliceSelector.vue";

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
const rubricFormValidation = reactive<IRubricGradeValidation>({
  earnedSlice: null
})

interface IRubricFormEmits {
  (event: 'submit', data: IFormData<IRubricGrade, IRubricGradeValidation>): void;
}
const emit = defineEmits<IRubricFormEmits>()



</script>

<style scoped>

</style>