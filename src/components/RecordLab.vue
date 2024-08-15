<template>
  <div>
    <p>
      RecordLab
    </p>
  </div>
</template>

<script setup lang="ts">
import {IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {onBeforeMount, ref, Ref, watch} from "vue";
import TeamSelector from "./TeamSelector.vue";
import {useDatabase} from "../composables/useDatabase.ts";
import StudentSelector from "./StudentSelector.vue";
import VerticalStack from "./VerticalStack.vue";

  export interface IRecordLabProps {
    teamRecord?: ITeamRecord;
    mode: 'create' | 'edit';
  }
  const {teamRecord, mode} = defineProps<IRecordLabProps>();

  export interface IRecordLabEmits {
    (event: 'delete'): void;
  }

  interface IRecordLabState {
    teamSelections: Ref<ITeam[]>;
    studentRecords: Ref<Array<IStudentRecord>>;
  }
  const state: IRecordLabState = {
    teamSelections: ref<Array<ITeam>>([]),
    studentRecords: ref<Array<IStudentRecord>>([])
  }

  const teamSelection = ref<ITeam | undefined>(undefined)

  const {getAllTeams} = useDatabase();

  watch(teamSelection, () => {
    console.log(teamSelection.value);
  })

  onBeforeMount(() => {
    getAllTeams().then((data) => {
      state.teamSelections.value.push(...data)
    })
  })
</script>

<style scoped>

</style>