<template>
  <div class="bg-neutral-100 p-2 rounded-md">
    <p class="text-sm font-medium mb-2">
      {{displayName}}
    </p>
    <div class="flex flex-col gap-2 @container/validation">
      <div class="flex gap-0.5 flex-col @xs/validation:flex-row @xs/validation:items-center @xs/validation:gap-1 " v-for="error in props.errors" :key="error.rubric.id">
        <div class=" w-fit flex flex-row items-center px-2 py-0.5 bg-slate-600 text-white gap-2 rounded-md">
          <ExclamationCircleIcon class="size-3"/>
          <p class="inline-block text-xs font-medium">
            {{ error.rubric.label}}
          </p>
        </div>
        <p class=" text-xs font-medium">
          {{error.message}}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ExclamationCircleIcon} from "@heroicons/vue/16/solid";
import {computed} from "vue";
import {IRubric, IStudent} from "../types.ts";

  export interface IRecordLabValidation {
    student: IStudent;
    errors: Array<{
      rubric: IRubric;
      message: string;
    }>;
  }

  const props = defineProps<IRecordLabValidation>()

  const displayName = computed(() => {
    return `${props.student.preferredName || props.student.firstName} ${props.student.lastName}`
  })

</script>

<style scoped>

</style>