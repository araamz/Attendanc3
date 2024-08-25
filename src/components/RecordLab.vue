<template>
  <div class="flex flex-col gap-4">
    <div v-if="team" class="flex flex-row justify-between items-center">
      <p class="font-semibold text-lg">
        {{ team.nickname || `TEAM #${team.teamNumber}` }}
      </p>
      <p class="bg-slate-600 text-white text-sm h-min w-fit font-medium py-1 px-2 drop-shadow rounded-md" v-if="rubricGroup">
        {{ rubricGroup.label }}
      </p>
    </div>
    <StudentSelector v-model:student-selection="state.currentStudentSelection.value" :student-selections="team?.assignedStudents || []"/>
  </div>
</template>

<script setup lang="ts">
import {IRubricGroup, IStudent, IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {onBeforeMount, ref, Ref, watch} from "vue";
import TeamSelector from "./TeamSelector.vue";
import {useDatabase} from "../composables/useDatabase.ts";
import StudentSelector from "./StudentSelector.vue";
import {useRouter} from "vue-router";

const router = useRouter();

export interface IRecordLabProps {
  team?: ITeam;
  rubricGroup?: IRubricGroup;
  mode: 'create' | 'edit';
}

const {team, rubricGroup, mode} = defineProps<IRecordLabProps>();

export interface IRecordLabEmits {
  (event: 'delete'): void;
}

onBeforeMount(() => {
  console.log('RecordLab', 'OnBeforeMount', team);

  if (router.currentRoute.value.query.student !== undefined && team !== undefined) {
    state.currentStudentSelection.value = team.assignedStudents.find((student: IStudent) => student.id === router.currentRoute.value.query.student)
  }
})


interface IRecordLabState {
  currentStudentSelection: Ref<IStudent | undefined>;
  studentRecords: Ref<Array<IStudentRecord>>;
}

const state: IRecordLabState = {
  currentStudentSelection: ref<IStudent | undefined>(),
  studentRecords: ref<Array<IStudentRecord>>([])
}

watch(state.currentStudentSelection, () => {
  console.log('RecordLab', 'watch',state.currentStudentSelection);
  if (state.currentStudentSelection.value !== undefined) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        student: state.currentStudentSelection.value.id
      }
    })
  }
})


</script>

<style scoped>

</style>