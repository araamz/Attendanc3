<template>
  <div class="@container/student-selector">
      <div class="flex flex-col gap-4 @sm/student-selector:grid @sm/student-selector:grid-cols-2 @md/student-selector:grid-cols-3 @lg/student-selector:grid-cols-4 @xl/student-selector:flex  @xl/student-selector:flex-row @xl/student-selector:flex-wrap">
        <label
            v-for="student in studentSelections"
            :key="student.id"
            class="group has-[:checked]:bg-slate-600 has-[:checked]:text-white transition-colors flex flex-row justify-between items-center bg-white p-4 rounded-md gap-3 @xl/student-selector:max-w-[170px] @xl/student-selector:w-[190px]"
        >
          <input class="peer appearance-none hidden" type="radio" v-model="studentSelectionModel" :value="student" :id="student.id">
          <div class="flex shrink flex-col *:leading-none gap-1">
            <p class="font-semibold text-lg line-clamp-1">
              {{ generalized ? student.firstName : student.preferredName || student.firstName }}
            </p>
            <p class="text-xs font-medium text-nowrap text-neutral-400 group-has-[:checked]:text-white">
              {{ student.lastName }}
            </p>
          </div>
          <p class="text-neutral-400 font-medium text-xs group-has-[:checked]:text-white">
            {{ student.preferredPronouns }}
          </p>
        </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {IStudent} from '../types';

const {studentSelections, generalized} = defineProps<{
  studentSelections: IStudent[];
  generalized?: boolean;
}>();


const studentSelectionModel = defineModel<IStudent | undefined>('studentSelection')

</script>
