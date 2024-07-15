<template>
  <PaperContainer>
    <VerticalStack spacing="lg">
      <VerticalStack spacing="md">
        <HorizontalStack spacing="md">
          <Input type="text" placeholder="First Name" v-model="firstName"/>
          <Input type="text" placeholder="Last Name" v-model="lastName"/>
        </HorizontalStack>
        <Input type="text" placeholder="Preferred Name" v-model="preferredName"/>
        <PronounsSelector v-model:preferred-pronouns="preferredPronouns" :form-identifier="String(index)" />
      </VerticalStack>

      <HorizontalStack class="justify-between">
        <IconButton :onclick="removeFunction">
          <template #icon>
            <XMarkIcon/>
          </template>
        </IconButton>
        <p class=" text-sm text-neutral-400 font-medium">
          Team Member #{{index + 1}}
        </p>
      </HorizontalStack>
    </VerticalStack>
  </PaperContainer>
</template>

<script setup lang="ts">

  import IconButton from "./IconButton.vue";
  import {XMarkIcon} from "@heroicons/vue/20/solid";
  import Input from "./InputContainer.vue";
  import VerticalStack from "./VerticalStack.vue";
  import HorizontalStack from "./HorizontalStack.vue";
  import PaperContainer from "./PaperContainer.vue";
  import PronounsSelector from "./PronounsSelector.vue";

  const firstName = defineModel<string>("firstName")
  const lastName = defineModel<string>("lastName")
  const preferredName = defineModel<string>("preferredName")
  const preferredPronouns = defineModel<string>("preferredPronouns")

  interface INewStudentFormProps {
    index: number;
    removeFunction: () => void;
  }
  const {index, removeFunction} = defineProps<INewStudentFormProps>();

</script>

<style scoped>

</style>