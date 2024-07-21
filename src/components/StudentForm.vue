<template>
  <form :id="formId" @submit.prevent="emit('submit', submitHandler($event))">
    <VerticalStack spacing="lg">
      <InputContainer label="First Name">
        <input type="text" name="firstName" placeholder="John" required/>
      </InputContainer>
      <InputContainer label="Last Name">
        <input type="text" name="lastName" placeholder="Doe" required/>
      </InputContainer>
      <InputContainer label="Preferred Name">
        <input type="text" name="preferredName" placeholder="JD"/>
      </InputContainer>
      <PronounsSelector v-model="preferredPronouns"/>
    </VerticalStack>
  </form>
</template>

<script setup lang="ts">

import Input from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import InputContainer from "./InputContainer.vue";
import {v4 as uuid} from 'uuid';
import {IStudent} from "../types.ts";
import PronounsSelector from "./PronounsSelector.vue";
import {ref} from "vue";

const preferredPronouns = ref<string>('')

function submitHandler(event: any): IStudent {

  console.log("submit", event.target['preferredName'].value)

  return {
    id: uuid(),
    firstName: event.target['firstName'].value,
    lastName: event.target['lastName'].value,
    preferredName: event.target['preferredName'].value.length > 0 ? event.target['preferredName'].value : undefined,
    preferredPronouns: preferredPronouns.value
  }

}

interface IStudentFormEmits {
  (event: 'submit', data: IStudent): boolean
}

const emit = defineEmits<IStudentFormEmits>()

interface IStudentFormProps {
  formId: string;
}

const {formId} = defineProps<IStudentFormProps>()

</script>

<style scoped>

</style>