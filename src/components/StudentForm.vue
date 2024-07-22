<template>
  <form :id="formId" @submit.prevent="emit('submit', submitHandler())">
    <VerticalStack spacing="lg">
      <InputContainer label="First Name">
        <input type="text" :v-model="studentFormData.firstName" @blur="validateField('firstName')" name="firstName"
               placeholder="John"/>
      </InputContainer>
      <InputContainer label="Last Name">
        <input type="text" :v-model="studentFormData.lastName" @blur="validateField('lastName')" name="lastName"
               placeholder="Doe"/>
      </InputContainer>
      <InputContainer label="Preferred Name">
        <input type="text" :v-model="studentFormData.preferredName" name="preferredName" placeholder="JD"/>
      </InputContainer>
      <PronounsSelector :v-model="studentFormData.preferredPronouns.value" @blur="validateField('preferredPronouns')"/>
    </VerticalStack>
  </form>
</template>

<script setup lang="ts">

// Validation Implementation inspired by: https://medium.com/@sj.anyway/interactive-form-validation-in-vue3-384643a02a27

import Input from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import {v4 as uuid} from 'uuid';
import {IFormData, IStudent} from "../types.ts";
import PronounsSelector from "./PronounsSelector.vue";
import {computed, Ref, ref, watch} from "vue";
import ValidationDescriptor from "./ValidationDescriptor.vue";

interface IStudentFormData {
  firstName: Ref<string>;
  lastName: Ref<string>;
  preferredName: Ref<string>;
  preferredPronouns: Ref<string>;
}

const studentFormData: IStudentFormData = {
  firstName: ref<string>(""),
  lastName: ref<string>(""),
  preferredName: ref<string>(""),
  preferredPronouns: ref<string>("")
}
const validationErrorsState = ref<{
  firstName: string | undefined;
  lastName: string | undefined;
  preferredPronouns: string | undefined;
}>({
  firstName: undefined,
  lastName: undefined,
  preferredPronouns: undefined
})

const isFirstNameValid = computed(() => studentFormData.firstName.value !== '')
const isLastNameValid = computed(() => studentFormData.lastName.value !== '')
const isPreferredPronouns = computed(() => studentFormData.preferredPronouns.value !== '')
const validationErrors = computed(() => {
  return Object.entries(validationErrorsState.value).filter(([key, value]) => {
    if (value !== undefined) return [key, value]
  })
})

watch(validationErrors, () => {
  console.log(validationErrors.value)
})

const validateField = (field: keyof IStudentFormData) => {
  if (field === 'firstName' && !isFirstNameValid.value) {
    validationErrorsState.value.firstName = "Student's first name is required."
  }
  if (field === 'lastName' && !isLastNameValid.value) {
    validationErrorsState.value.lastName = "Student's last name is required."
  }
  if (field === 'preferredPronouns' && !isPreferredPronouns.value) {
    validationErrorsState.value.preferredPronouns = "Student's preferred pronouns is not selected."
  }
}

function submitHandler(): IFormData<IStudent> {

  validationErrorsState.value = {
    firstName: undefined,
    lastName: undefined,
    preferredPronouns: undefined
  }
  validateField('firstName')
  validateField('lastName')
  validateField('preferredPronouns')

  const studentObject: IStudent = {
    id: uuid(),
    firstName: studentFormData.firstName.value,
    lastName: studentFormData.lastName.value,
    preferredName: studentFormData.preferredName.value.length > 0 ? studentFormData.preferredName.value : undefined,
    preferredPronouns: studentFormData.preferredPronouns.value
  }

  return {
    data: studentObject,
    validation: {
      successful: validationErrorsState.value.length === 0,
      errors: validationErrorsState.value
    }
  }

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

<style scoped>

</style>