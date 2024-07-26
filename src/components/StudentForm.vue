<script setup lang="ts">

// Validation Implementation inspired by: https://medium.com/@sj.anyway/interactive-form-validation-in-vue3-384643a02a27

import Input from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import {IFormData, IStudent} from "../types.ts";
import PronounsSelector from "./PronounsSelector.vue";
import {computed, reactive} from "vue";
import {v4 as uuid} from 'uuid';
import ValidationDescriptor from "./ValidationDescriptor.vue";

const firstName = defineModel<string>('firstName', {
  default: ''
})
const lastName = defineModel<string>('lastName', {
  default: ''
})
const preferredName = defineModel<string>('preferredName', {
  default: ''
})
const preferredPronouns = defineModel<string>('preferredPronouns', {
  default: ''
})
const notes = defineModel<string>('notes', {
  default: ''
})

export interface IStudentFormValidation {
  firstName: string | null;
  lastName: string | null;
  preferredPronouns: string | null;
}

const studentFormValidation = reactive<IStudentFormValidation>({
  firstName: null,
  lastName: null,
  preferredPronouns: null
})

const isFirstNameValid = computed<boolean>(() => firstName.value.trim() !== '')
const isLastNameValid = computed<boolean>(() => lastName.value.trim() !== '')
const isPreferredPronounsValid = computed<boolean>(() => preferredPronouns.value !== '')
const hasValidationErrors = computed<boolean>(() => !isFirstNameValid.value || !isLastNameValid.value || !isPreferredPronounsValid.value)

const validateForm = (field?: keyof IStudentFormValidation): IStudentFormValidation => {

  if (field === undefined) {
    studentFormValidation.firstName = null;
    studentFormValidation.lastName = null;
    studentFormValidation.preferredPronouns = null;
  } else {
    studentFormValidation[field] = null;
  }

  if (field) {
    if ((field === "firstName" && !isFirstNameValid.value)) {
      studentFormValidation[field] = "Student's first name is missing.";
    }
    if ((field === "lastName" && !isLastNameValid.value)) {
      studentFormValidation[field] = "Student's last name is missing.";
    }
    if ((field === "preferredPronouns" && !isPreferredPronounsValid.value)) {
      studentFormValidation[field] = "Student's preferred name is not selected.";
    }
  } else {
    if (!isFirstNameValid.value) studentFormValidation.firstName = "Student's first name is missing.";
    if (!isLastNameValid.value) studentFormValidation.lastName = "Student's last name is missing.";
    if (!isPreferredPronounsValid.value) studentFormValidation.preferredPronouns = "Student's preferred name is not selected.";
  }

  return {
    ...studentFormValidation
  }
}

function submitHandler(): IFormData<IStudent, IStudentFormValidation> {

  const validation = validateForm()
  const data = () => {
    if (hasValidationErrors.value) return null;
    return {
      id: uuid(),
      firstName: firstName.value,
      lastName: lastName.value,
      preferredName: preferredName.value === '' ? null : preferredName.value,
      preferredPronouns: preferredPronouns.value,
      notes: notes.value === '' ? null : notes.value,
    }
  }

  return {
    data: data(),
    validation: validation
  }
}


interface IStudentFormEmits {
  (event: 'submit', data: IFormData<IStudent, IStudentFormValidation>): void
}

const emit = defineEmits<IStudentFormEmits>()

interface IStudentFormProps {
  formId: string;
}

const {formId} = defineProps<IStudentFormProps>()

</script>

<template>
  <form :id="formId" @submit.prevent="emit('submit', submitHandler())">
    <VerticalStack>
      <VerticalStack spacing="lg">
        <InputContainer label="First Name">
          <input type="text" v-model="firstName" @blur="validateForm('firstName')" placeholder="John"/>
        </InputContainer>
        <InputContainer label="Last Name">
          <input type="text" v-model="lastName" @blur="validateForm('lastName')" name="lastName"
                 placeholder="Doe"/>
        </InputContainer>
        <InputContainer label="Preferred Name">
          <input type="text" v-model="preferredName" name="preferredName" placeholder="JD"/>
        </InputContainer>
        <PronounsSelector v-model="preferredPronouns" @blur="validateForm('preferredPronouns')"/>
        <InputContainer label="Notes">
          <textarea v-model="notes" rows="10" name="notes" placeholder="Rides skateboards in their free time..." />
        </InputContainer>
      </VerticalStack>
      <VerticalStack :v-if="hasValidationErrors" spacing="sm">
        <ValidationDescriptor v-if="studentFormValidation.firstName !== null" label="First Name"
                              :message="studentFormValidation.firstName"/>
        <ValidationDescriptor v-if="studentFormValidation.lastName !== null" label="Last Name"
                              :message="studentFormValidation.lastName"/>
        <ValidationDescriptor v-if="studentFormValidation.preferredPronouns !== null" label="Preferred Pronouns"
                              :message="studentFormValidation.preferredPronouns"/>
      </VerticalStack>
    </VerticalStack>
  </form>
</template>

<style scoped>

</style>