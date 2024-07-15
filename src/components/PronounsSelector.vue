<template>
  <HorizontalStack spacing="md" class="[&>*]:grow w-full">
    <label
        :class="[pronounOptionActive(pronoun) ? 'bg-slate-600 text-white' : 'bg-neutral-100 text-neutral-400','grow flex justify-center p-1.5 rounded-md']"
        :for="selectionIdentifier(pronoun)" v-for="pronoun in pronounsOptions">
      <input class="outline-0 appearance-none hidden" type="radio" :id="selectionIdentifier(pronoun)" :value="pronoun"
             v-model="preferredPronouns"/>
      <span class="font-medium">
        {{ pronoun }}
      </span>
    </label>
  </HorizontalStack>
</template>

<script setup lang="ts">
  import Input from "./InputContainer.vue";
  import HorizontalStack from "./HorizontalStack.vue";

  const pronounsOptions = [
    "she/her",
    "he/him",
    "they/them",
    "pns"
  ]

  const preferredPronouns = defineModel<string>("preferredPronouns")
  const pronounOptionActive = (pronoun: string) => {
    return pronoun === preferredPronouns.value;
  }
  const selectionIdentifier = (pronoun: string) => {
    return [pronoun, formIdentifier].toString()
  }

  interface IPronounsSelectorProps {
    formIdentifier: string;
  }
  const {formIdentifier} = defineProps<IPronounsSelectorProps>()
</script>

<style scoped>

</style>