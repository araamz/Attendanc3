<template>
  <div class="flex flex-col items-center bg-white p-4 gap-4 rounded-md drop-shadow">
    <VerticalStack spacing="md">
      <div class="flex flex-row gap-4 w-full">
        <Input type="text" placeholder="First Name" v-model="firstName"/>
        <Input type="text" placeholder="Last Name" v-model="lastName"/>
      </div>
      <Input type="text" placeholder="Preferred Name" v-model="preferredName"/>
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

  const firstName = defineModel<string>("firstName")
  const lastName = defineModel<string>("lastName")
  const preferredName = defineModel<string>("preferredName")

  interface INewStudentFormProps {
    index: number;
    removeFunction: () => void;
  }
  const {index, removeFunction} = defineProps<INewStudentFormProps>();


</script>

<style scoped>

</style>