<template>
  <InputContainer label="Rubric Selection" class="@container/rubric-selector">
    <div
        class="grid grid-cols-2 gap-4 @md/rubric-selector:flex  @md/rubric-selector:flex-row @md/rubric-selector:flex-wrap">
      <label
          v-for="rubric in rubricGroupSelections"
          :key="rubric.id"
          class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 flex justify-center p-1.5 rounded-md"
      >
        <input class="appearance-none hidden" type="radio" :id="String(rubric.id)" v-model="rubricGroupSelectionModel" :value="rubric">
        <span class="font-medium">
          {{rubric.label}}
        </span>
      </label>
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {IRubricGroup} from '../types';
import InputContainer from "./InputContainer.vue";

const {rubricGroupSelections} = defineProps<{
  rubricGroupSelections: Array<IRubricGroup>;
}>();

const rubricGroupSelectionModel = defineModel<IRubricGroup | undefined>('rubricGroupSelection')

</script>
