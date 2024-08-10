!
<template>
  <div>

  </div>
</template>

<script setup lang="ts">

import {ModelRef} from "vue";

interface IRadioSelectorProps<DataType> {
  selections: Array<DataType>;
  formId: string;
}
const {selections, formId} = defineProps<IRadioSelectorProps<any>>()

interface IRadioSelectorModel<DataType> {
  currentSelection: ModelRef<DataType>;
}
const model = defineModel<IRadioSelectorModel<any>>()

</script>

<style scoped>

</style>