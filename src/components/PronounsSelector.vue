<template>
  <InputContainer label="Pronouns">
    <HorizontalStack spacing="md" class="[&>*]:grow w-full">
      <label
          class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 grow flex justify-center p-1.5 rounded-md"
          :for="pronoun" v-for="pronoun in pronounsOptions">
        <input class="group outline-0 appearance-none hidden" type="radio" :id="pronoun" :value="pronoun"
               v-model="preferredPronouns" required/>
        <span class="font-medium">
        {{ pronoun }}
      </span>
      </label>
    </HorizontalStack>
  </InputContainer>
</template>

<script setup lang="ts">
import Input from "./InputContainer.vue";
import HorizontalStack from "./HorizontalStack.vue";
import InputContainer from "./InputContainer.vue";

const pronounsOptions = [
  "she/her",
  "he/him",
  "they/them",
  "pns"
]

const preferredPronouns = defineModel<string>()

</script>

<style scoped>

</style>