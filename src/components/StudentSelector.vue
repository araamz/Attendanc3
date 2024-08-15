<template>
  <PaperContainer class="@container/team-selector">
    <InputContainer label="Student Selection">
      <div class="grid grid-cols-2 gap-4 @md/team-selector:grid-cols-3 @lg/team-selector:grid-cols-4 @xl/team-selector:flex  @xl/team-selector:flex-row @xl/team-selector:flex-wrap">
        <label
            v-for="student in studentSelections"
            :key="student.id"
            class="has-[:checked]:bg-slate-600 has-[:checked]:text-white transition-colors flex flex-row justify-between items-center bg-neutral-100 p-4 rounded-md gap-3 @xl/team-selector:max-w-[160px] @xl/team-selector:w-[160px]"
        >
          <input class="peer appearance-none hidden" type="radio" v-model="studentSelectionModel" :value="student">
          <div class="flex flex-col *:leading-none gap-1">
            <p class="font-semibold text-lg line-clamp-1">
              {{ generalized ? student.firstName : student.preferredName || student.firstName }}
            </p>
            <p class="text-xs font-medium text-nowrap">
              {{ student.preferredPronouns }}
            </p>
          </div>
          <div class="peer-checked:text-white text-neutral-500 hidden flex-col items-center @xs/team-selector:flex *:leading-none gap-1">

          </div>
        </label>
      </div>
    </InputContainer>
  </PaperContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import PaperContainer from './PaperContainer.vue';
import {IStudent} from '../types';
import InputContainer from "./InputContainer.vue";

const {studentSelections, generalized} = defineProps<{
  studentSelections: IStudent[];
  generalized?: boolean;
}>();

const studentSelectionModel = defineModel<IStudent | undefined>('studentSelection')
</script>
