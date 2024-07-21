<template>
  <form :id="formId" @submit.prevent="emit('submit', submitHandler($event))" >
    <VerticalStack spacing="lg">
      <InputContainer label="Team Number">
        <input type="number" name="number" placeholder="230" required />
      </InputContainer>
      <InputContainer label="Team Nickname">
        <input type="text" name="nickname" placeholder="Dream Team" />
      </InputContainer>
      <InputContainer label="Table">
        <input type="number" name="table" placeholder="1" required />
      </InputContainer>
      <InputContainer label="Class Section">
        <input type="number" name="section" placeholder="1204" required />
      </InputContainer>
      <InputContainer label="Mentor">
        <input type="text" name="mentor" placeholder="John Doe" required />
      </InputContainer>
    </VerticalStack>
  </form>
</template>

<script setup lang="ts">

  import VerticalStack from "./VerticalStack.vue";
  import InputContainer from "./InputContainer.vue";

  export interface ITeamInformationFormData {
    number: number;
    nickname?: string;
    table: number;
    section: number;
    mentor: string;
  }
  function submitHandler(event: any): ITeamInformationFormData {
    const processedNickname = event.target['nickname'].value.length > 0 ? event.target['nickname'].value : undefined

    return {
      number: Number(event.target['number'].value),
      nickname: processedNickname,
      table: Number(event.target['table'].value),
      section: Number(event.target['section'].value),
      mentor: event.target['mentor'].value
    }
  }

  interface ITeamInformationEmits {
    (event: 'submit', data: ITeamInformationFormData): void;
  }
  const emit = defineEmits<ITeamInformationEmits>()

  interface ITeamInformationProps {
    formId: string;
  }
  const {formId} = defineProps<ITeamInformationProps>();
</script>

<style scoped>

</style>