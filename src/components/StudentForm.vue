<template>
  <VerticalStack spacing="lg">
    <form :id="formId" @submit.prevent="emit('submit', submitHandler($event))">
      <VerticalStack spacing="lg">
        <InputContainer label="First Name">
          <input type="text" name="firstName" placeholder="John" required />
        </InputContainer>
        <InputContainer label="Last Name">
          <input type="text" name="lastName" placeholder="Doe" required />
        </InputContainer>
        <InputContainer label="Preferred Name">
          <input type="text" name="preferredName" placeholder="JD" />
        </InputContainer>
        <PronounsSelector formId="preferredPronouns" />
      </VerticalStack>
      <HorizontalStack>
        <button type="submit" @click="submitHandler">Submit</button>
      </HorizontalStack>
    </form>
  </VerticalStack>
</template>

<script setup lang="ts">

  import Input from "./InputContainer.vue";
  import VerticalStack from "./VerticalStack.vue";
  import InputContainer from "./InputContainer.vue";
  import {v4 as uuid} from 'uuid';
  import {IStudent} from "../types.ts";
  import PronounsSelector from "./PronounsSelector.vue";
  import HorizontalStack from "./HorizontalStack.vue";

  function submitHandler(event: any): IStudent {

    const processedPreferredName = event.target['preferredName'].value.length > 0 ? event.target['preferredName'].value : undefined

    return {
      id: uuid(),
      firstName: event.target['firstName'].value,
      lastName: event.target['lastName'].value,
      preferredName: processedPreferredName,
      preferredPronouns: event.target['preferredPronouns'].value
    }
  }

  interface IStudentFormEmits {
    (event: 'submit', data: IStudent): void
  }
  const emit = defineEmits<IStudentFormEmits>()

  interface IStudentFormProps {
    formId: string;
  }
  const {formId} = defineProps<IStudentFormProps>()

</script>

<style scoped>

</style>