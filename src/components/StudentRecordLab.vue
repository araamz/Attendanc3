<template>
  <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2">
    <RubricForm v-for="(grade, index) in props.studentRecord.grades" :rubric="grade.rubric" v-model:earned-slice="props.studentRecord.grades[index].earnedSlice" v-model:comment="props.studentRecord.grades[index].comment" />
  </div>
</template>

<script setup lang="ts">

import {IStudentRecord} from "../types.ts";
import RubricForm from "./RubricForm.vue";


  interface IStudentRecordLabProps {
    studentRecord: IStudentRecord;
  }
  const props = defineProps<IStudentRecordLabProps>()


</script>

<style scoped>

</style>