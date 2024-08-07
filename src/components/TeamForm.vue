<template>
  <form ref="teamFormReference" :id="formId" @submit.prevent="emit('submit', submitHandler())">
    <VerticalStack>
      <VerticalStack spacing="lg">
        <InputContainer label="Team Number">
          <input type="number" v-model="teamNumber" @blur="validateForm('teamNumber')" name="number" placeholder="230" :disabled="freezeTeamNumber" />
        </InputContainer>
        <InputContainer label="Team Nickname">
          <input type="text" v-model="nickname" name="nickname" placeholder="Dream Team"/>
        </InputContainer>
        <InputContainer label="Table">
          <input type="number" v-model="table" @blur="validateForm('table')" name="table" placeholder="1"/>
        </InputContainer>
        <InputContainer label="Section">
          <input type="number" v-model="section" @blur="validateForm('section')" name="section" placeholder="1204"/>
        </InputContainer>
        <InputContainer label="Mentor">
          <input type="text" v-model="mentor" @blur="validateForm('mentor')" name="mentor" placeholder="John Doe"/>
        </InputContainer>
      </VerticalStack>
      <VerticalStack :v-if="hasValidationErrors" spacing="sm">
        <ValidationDescriptor v-if="teamFormValidation.teamNumber !== null" label="Team Number"
                              :message="teamFormValidation.teamNumber"/>
        <ValidationDescriptor v-if="teamFormValidation.table !== null" label="Table"
                              :message="teamFormValidation.table"/>
        <ValidationDescriptor v-if="teamFormValidation.section !== null" label="Section"
                              :message="teamFormValidation.section"/>
        <ValidationDescriptor v-if="teamFormValidation.mentor !== null" label="Mentor"
                              :message="teamFormValidation.mentor"/>
        <ValidationDescriptor v-if="teamFormValidation.assignedStudents !== null" label="Assigned Students"
                              :message="teamFormValidation.assignedStudents"/>
      </VerticalStack>
    </VerticalStack>
  </form>
</template>

<script setup lang="ts">

// Validation Implementation inspired by: https://medium.com/@sj.anyway/interactive-form-validation-in-vue3-384643a02a27

import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import {computed, reactive, ref} from "vue";
import {IFormData, IStudent, ITeam} from "../types.ts";
import ValidationDescriptor from "./ValidationDescriptor.vue";

const teamNumber = defineModel<number | string>('teamNumber', {
  default: ''
})
const nickname = defineModel<string>('nickname', {
  default: ''
})
const table = defineModel<number | string>('table', {
  default: ''
})
const section = defineModel<number | string>('section', {
  default: ''
})
const mentor = defineModel<string>('mentor', {
  default: ''
})
const assignedStudents = defineModel<Array<IStudent>>('assignedStudents', {
  default: [],
})

export interface ITeamFormValidation {
  teamNumber: string | null;
  table: string | null;
  section: string | null;
  mentor: string | null;
  assignedStudents: string | null
}
const teamFormValidation = reactive<ITeamFormValidation>({
  teamNumber: null,
  table: null,
  section: null,
  mentor: null,
  assignedStudents: null
})

const isTeamNumberValid = computed<boolean>(() => teamNumber.value !== '');
const isTableValid = computed<boolean>(() => table.value !== '');
const isSectionValid = computed<boolean>(() => section.value !== '');
const isMentorValid = computed<boolean>(() => mentor.value.trim() !== '');
const isAssignedStudentsValid = computed<boolean>(() => assignedStudents.value.length > 1);
const hasValidationErrors = computed<boolean>(() => !isTeamNumberValid.value || !isTableValid.value || !isSectionValid.value || !isMentorValid.value || !isAssignedStudentsValid.value);

const validateForm = (field?: keyof ITeamFormValidation): ITeamFormValidation => {

  const teamNumberValidationMessage = "Team's assigned number is missing.";
  const tableValidationMessage = "Team's assigned table is missing.";
  const sectionValidationMessage = "Team's assigned section is missing.";
  const mentorValidationMessage = "Team's assigned mentor is missing.";
  const assignedStudentsValidationMessage = "There must be at least two students assigned.";

  if (field === undefined) {
    teamFormValidation.teamNumber = null;
    teamFormValidation.table = null;
    teamFormValidation.section = null;
    teamFormValidation.mentor = null;
    teamFormValidation.assignedStudents = null;
  } else {
    teamFormValidation[field] = null;
  }

  if (field) {
    if ((field === "teamNumber" && !isTeamNumberValid.value)) teamFormValidation[field] = teamNumberValidationMessage;
    if (field === "table" && !isTableValid.value) teamFormValidation[field] = tableValidationMessage;
    if (field === "section" && !isSectionValid.value) teamFormValidation[field] = sectionValidationMessage;
    if (field === "mentor" && !isMentorValid.value) teamFormValidation[field] = mentorValidationMessage;
    if (field === 'assignedStudents' && !isAssignedStudentsValid.value) teamFormValidation[field] = assignedStudentsValidationMessage;
  } else {
    if (!isTeamNumberValid.value) teamFormValidation.teamNumber = teamNumberValidationMessage;
    if (!isTableValid.value) teamFormValidation.table = tableValidationMessage;
    if (!isSectionValid.value) teamFormValidation.section = sectionValidationMessage;
    if (!isMentorValid.value) teamFormValidation.mentor = mentorValidationMessage;
    if (!isAssignedStudentsValid.value) teamFormValidation.assignedStudents = assignedStudentsValidationMessage;
  }

  return {
    ...teamFormValidation
  }
}

function submitHandler(): IFormData<ITeam, ITeamFormValidation> {

  const validation = validateForm()

  const data = () => {
    if (hasValidationErrors.value) return null;
    return {
      teamNumber: Number(teamNumber.value),
      nickname: nickname.value.trim() === '' ? null : nickname.value,
      table: Number(table.value),
      section: Number(section.value),
      mentor: mentor.value.trim(),
      assignedStudents: assignedStudents.value
    }
  }

  return {
    data: data(),
    validation: validation
  }

}

const teamFormReference = ref(undefined)
const forceSubmit = (): boolean => {
  if (teamFormReference.value === undefined) return false;
  teamFormReference.value.requestSubmit();
  return true;
}
defineExpose({
  forceSubmit
});

interface ITeamFormEmits {
  (event: 'submit', data: IFormData<ITeam, ITeamFormValidation>): void;
}

const emit = defineEmits<ITeamFormEmits>()

interface ITeamFormProps {
  formId: string;
  freezeTeamNumber?: boolean;
}

const {formId} = defineProps<ITeamFormProps>();

</script>

<style scoped>

</style>