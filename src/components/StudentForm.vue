<script setup lang="ts">

// Validation Implementation inspired by: https://medium.com/@sj.anyway/interactive-form-validation-in-vue3-384643a02a27

import Input from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import {IFormData, IStudent} from "../types.ts";
import PronounsSelector from "./PronounsSelector.vue";
import {computed, reactive, ref, watch} from "vue";

interface IStudentFormData {
  firstName: string;
  lastName: string;
  preferredName?: string;
  preferredPronouns: string;
}

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

interface IStudentFormValidation {
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

watch(isFirstNameValid, () => {
  console.log(isFirstNameValid.value)
})

const validateField = (field: keyof IStudentFormValidation) => {
  studentFormValidation[field] = null;
  console.log("RUNNING", isLastNameValid.value, studentFormValidation[field])
  if (field === "firstName" && !isFirstNameValid) {
    studentFormValidation[field] = "Student's first name is missing.";
  }
  if (field === "lastName" && !isLastNameValid) {
    studentFormValidation[field] = "Student's last name is missing.";
  }
  if (field === "preferredPronouns" && !isPreferredPronounsValid) {
    studentFormValidation[field] = "Student's preferred name is not selected.";
  }
}

const clearStudentFormValidation = () => {
  studentFormValidation.firstName = null;
  studentFormValidation.lastName = null;
  studentFormValidation.preferredPronouns = null;
}

function submitHandler(): IFormData<IStudent> {

  clearStudentFormValidation()
  validateField('firstName')
  validateField('lastName')
  validateField('preferredPronouns')
  console.log(studentFormValidation)
  console.log(firstName.value, lastName.value, preferredPronouns.value)
}

interface IStudentFormEmits {
  (event: 'submit', data: IFormData<IStudent>): void
}

const emit = defineEmits<IStudentFormEmits>()

interface IStudentFormProps {
  formId: string;
}

const {formId} = defineProps<IStudentFormProps>()

</script>

<template>
  <form :id="formId" @submit.prevent="emit('submit', submitHandler())">
    <VerticalStack spacing="lg">
      <InputContainer label="First Name">
        <input type="text" v-model="firstName" @blur="validateField('firstName')" placeholder="John"/>
      </InputContainer>
      <InputContainer label="Last Name">
        <input type="text" v-model="lastName" @blur="validateField('lastName')" name="lastName"
               placeholder="Doe"/>
      </InputContainer>
      <InputContainer label="Preferred Name">
        <input type="text" v-model="preferredName" name="preferredName" placeholder="JD"/>
      </InputContainer>
      <PronounsSelector v-model="preferredPronouns" @blur="validateField('preferredPronouns')"/>
    </VerticalStack>
  </form>
</template>

<style scoped>

</style>