<template>
  <div>
    <div>
      <TeamSelector :team-selections="state.teamSelections.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {computed, onBeforeMount, ref, Ref} from "vue";
import TeamSelector from "./TeamSelector.vue";
import {useDatabase} from "../composables/useDatabase.ts";

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

  const {getAllTeams} = useDatabase();

  onBeforeMount(() => {
    getAllTeams().then((data) => {
      state.teamSelections.value.push(...data)
    })
  })
</script>

<style scoped>

</style>