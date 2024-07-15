<template>
  <div class="flex flex-col items-center bg-white p-4 gap-4 rounded-md drop-shadow">
    <VerticalStack spacing="md" class="w-full">
      <div class="flex flex-row gap-4 w-full">
        <Input type="text" placeholder="First Name" v-model="firstName"/>
        <Input type="text" placeholder="Last Name" v-model="lastName"/>
      </div>
      <Input type="text" placeholder="Preferred Name" v-model="preferredName"/>
      <div class="flex flex-row [&>*]:grow gap-2 w-full">
        <label :class="[pronoun === pronouns ? 'bg-slate-600 text-white' : 'bg-neutral-100 text-neutral-400','flex justify-center p-1.5 rounded-md']" :for="`${index}-${pronoun}`" v-for="pronoun in pronounsOptions">
          <input class="outline-0 appearance-none" type="radio" :id="`${index}-${pronoun}`" :value="pronoun" v-model="pronouns" />
          <span class="font-medium">
          {{pronoun}}
        </span>
        </label>
      </div>
    </VerticalStack>

    <div class="flex flex-row w-full items-center justify-between">
      <IconButton :onclick="removeFunction">
        <template #icon>
          <XMarkIcon/>
        </template>
      </IconButton>
      <p class=" text-sm text-neutral-400 font-medium">
        Team Member #{{index + 1}}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

  import IconButton from "./IconButton.vue";
  import {XMarkIcon} from "@heroicons/vue/20/solid";
  import Input from "./Input.vue";
  import VerticalStack from "./VerticalStack.vue";

  const pronounsOptions = [
    "she/her",
    "he/him",
    "they/them",
    "pns"
  ]

  const firstName = defineModel<string>("firstName")
  const lastName = defineModel<string>("lastName")
  const preferredName = defineModel<string>("preferredName")
  const pronouns = defineModel<string>("pronouns")

  interface INewStudentFormProps {
    index: number;
    removeFunction: () => void;
  }
  const {index, removeFunction} = defineProps<INewStudentFormProps>();


</script>

<style scoped>

</style>