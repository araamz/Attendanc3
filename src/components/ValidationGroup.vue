<template>
  <VerticalStack>
    <ValidationDescriptor v-for="error in errors" :form-label="error.formLabel" :message="error.message" />
  </VerticalStack>
</template>

<script setup lang="ts">

  import {IValidationError} from "../types.ts";
  import VerticalStack from "./VerticalStack.vue";
  import ValidationDescriptor from "./ValidationDescriptor.vue";
  import {watch} from "vue";

  watch(errors, () => {
    console.log(errors)
  })

  interface IValidationGroupProps {
    errors: Array<IValidationError>;
  }
  const {errors} = defineProps<IValidationGroupProps>()

</script>

<style scoped>

</style>