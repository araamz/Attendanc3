<script setup lang="ts">

import Input from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import { IFormData, IStudent } from "../types.ts";
import PronounsSelector from "./PronounsSelector.vue";
import { computed, reactive, ref } from "vue";
import { v4 as uuid } from 'uuid';
import ValidationDescriptor from "./ValidationDescriptor.vue";

interface IStudentFormProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  preferredName?: string | null;
  preferredPronouns?: string;
  notes?: string | null;
  formId: string;
}

const props = defineProps<IStudentFormProps>();
const { formId, id, firstName: firstNameProp, lastName: lastNameProp, preferredName: preferredNameProp, preferredPronouns: preferredPronounsProp, notes: notesProp } = props;

const firstName = ref(firstNameProp || '');
const lastName = ref(lastNameProp || '');
const preferredName = ref(preferredNameProp || '');
const preferredPronouns = ref(preferredPronounsProp || '');
const notes = ref(notesProp || '');

export interface IStudentFormValidation {
  firstName: string | null;
  lastName: string | null;
  preferredPronouns: string | null;
}

const studentFormValidation = reactive<IStudentFormValidation>({
  firstName: null,
  lastName: null,
  preferredPronouns: null
});

const isFirstNameValid = computed(() => firstName.value.trim() !== '');
const isLastNameValid = computed(() => lastName.value.trim() !== '');
const isPreferredPronounsValid = computed(() => preferredPronouns.value !== '');
const hasValidationErrors = computed(() => !isFirstNameValid.value || !isLastNameValid.value || !isPreferredPronounsValid.value);

const validateForm = (field?: keyof IStudentFormValidation): IStudentFormValidation => {
  if (field === undefined) {
    studentFormValidation.firstName = null;
    studentFormValidation.lastName = null;
    studentFormValidation.preferredPronouns = null;
  } else {
    studentFormValidation[field] = null;
  }

  if (field) {
    if (field === "firstName" && !isFirstNameValid.value) {
      studentFormValidation[field] = "Student's first name is missing.";
    }
    if (field === "lastName" && !isLastNameValid.value) {
      studentFormValidation[field] = "Student's last name is missing.";
    }
    if (field === "preferredPronouns" && !isPreferredPronounsValid.value) {
      studentFormValidation[field] = "Student's preferred pronouns are not selected.";
    }
  } else {
    if (!isFirstNameValid.value) studentFormValidation.firstName = "Student's first name is missing.";
    if (!isLastNameValid.value) studentFormValidation.lastName = "Student's last name is missing.";
    if (!isPreferredPronounsValid.value) studentFormValidation.preferredPronouns = "Student's preferred pronouns are not selected.";
  }

  return {
    ...studentFormValidation
  };
};

function submitHandler(): IFormData<IStudent, IStudentFormValidation> {
  const validation = validateForm();
  const data = () => {
    if (hasValidationErrors.value) return null;
    return {
      id: id ? id : uuid(),
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      preferredName: preferredName.value === '' ? null : preferredName.value,
      preferredPronouns: preferredPronouns.value.trim(),
      notes: notes.value.trim() === '' ? null : notes.value.trim(),
    };
  };

  return {
    data: data(),
    validation: validation
  };
}

const studentFormReference = ref<HTMLFormElement | null>(null);
const forceSubmit = (): boolean => {
  if (!studentFormReference.value) return false;
  studentFormReference.value.requestSubmit();
  return true;
};

defineExpose({
  forceSubmit
});

interface IStudentFormEmits {
  (event: 'submit', data: IFormData<IStudent, IStudentFormValidation>): void;
}
const emit = defineEmits<IStudentFormEmits>();
</script>

<template>
  <form ref="studentFormReference" :id="formId" @submit.prevent="emit('submit', submitHandler())">
    <VerticalStack>
      <VerticalStack spacing="lg">
        <InputContainer label="First Name">
          <input type="text" v-model="firstName" @blur="validateForm('firstName')" name="firstName" placeholder="John"/>
        </InputContainer>
        <InputContainer label="Last Name">
          <input type="text" v-model="lastName" @blur="validateForm('lastName')" name="lastName" placeholder="Doe"/>
        </InputContainer>
        <InputContainer label="Preferred Name">
          <input type="text" v-model="preferredName" name="preferredName" placeholder="JD"/>
        </InputContainer>
        <PronounsSelector v-model="preferredPronouns" @blur="validateForm('preferredPronouns')"/>
        <InputContainer label="Notes">
          <textarea v-model="notes" rows="10" name="notes" placeholder="Rides skateboards in their free time..."/>
        </InputContainer>
      </VerticalStack>
      <VerticalStack v-if="hasValidationErrors" spacing="sm">
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
