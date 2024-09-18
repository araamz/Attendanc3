<script setup lang="ts">

import {computed, inject, onBeforeMount, ref, Ref, watch} from "vue";
import {v4 as uuid} from "uuid"
import ViewShell from "../components/ViewShell.vue";
import {useDatabase} from "../composables/useDatabase.ts";
import {IRubric, IRubricGrade, IRubricGroup, IStudent, IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {useRouter} from "vue-router";
import TeamSelector from "../components/TeamSelector.vue";
import RubricGroupSelector from "../components/RubricGroupSelector.vue";
import RecordLab from "../components/RecordLab.vue";
import StatusDialog, {IStatusDialogProps} from "../components/StatusDialog.vue";

const router = useRouter()
const {getAllTeams, getSingleTeam, createRecord} = useDatabase();
const rubricGroupSelections = inject("rubricGroupSelections");

const teamSelections = ref<Array<ITeam>>([]);

interface IGradeViewState {
  currentTeamSelection: Ref<ITeam | null>;
  currentRubricGroupSelection: Ref<IRubricGroup | null>;
  studentRecords: Ref<Array<IStudentRecord>>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
}

const state: IGradeViewState = {
  currentTeamSelection: ref<ITeam | null>(null),
  currentRubricGroupSelection: ref<IRubricGroup | null>(null),
  studentRecords: ref<Array<IStudentRecord>>([]),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null)
}

const rubricReady = computed(() => {
  return state.studentRecords.value.length > 0
})

watch([state.currentTeamSelection, state.currentRubricGroupSelection], ([newTeamSelection, newRubricGroupSelection]): void => {
  if (newTeamSelection === null) state.currentTeamSelection.value = null;
  if (newRubricGroupSelection === null) state.currentRubricGroupSelection.value = null;
  if (newRubricGroupSelection === null || newTeamSelection === null) return;
  state.studentRecords.value = newTeamSelection.assignedStudents.map((student: IStudent): IStudentRecord => ({
    student: student,
    rubricGroup: newRubricGroupSelection,
    grades: newRubricGroupSelection.rubrics.map((rubric: IRubric): IRubricGrade => ({
      rubric: rubric,
      earnedSlice: undefined,
      comment: ''
    }))
  }))
})

const setTeamSelection = (teamNumber: number) => {
  getSingleTeam(teamNumber).then((team) => {
    state.currentTeamSelection.value = team;
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: String(teamNumber)
      }
    })
  }).catch((error) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: undefined
      }
    })
  })
}

const setRubricGroupSelection = (rubricGroupId: string) => {
  if (rubricGroupSelections.some((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)) {
    state.currentRubricGroupSelection.value = rubricGroupSelections.find((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId);
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: rubricGroupId
      }
    })
  } else {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: undefined
      }
    })
  }
}

const handleTeamSelection = (team: ITeam) => {
  setTeamSelection(team.teamNumber)
}

const handleRubricGroupSelection = (rubricGroup: IRubricGroup) => {
  setRubricGroupSelection(rubricGroup.id)
}

const handleStatusDialogClose = () => {
  if (!state.statusDialogOpen.value || !state.statusDialogState.value) return;

  if (state.statusDialogState.value.type === 'successful') router.push({name: 'records_list'})
  else {
    state.statusDialogOpen.value = false;
    state.statusDialogOpen.value = null;
  }
}

const handleRecordLabSubmission = (records: Array<IStudentRecord>) => {
  const teamRecord: ITeamRecord = {
    id: uuid(),
    team: state.currentTeamSelection.value,
    studentRecords: records,
    timestamp: new Date(),
  }

  createRecord(teamRecord).then((recordId) => {
    state.statusDialogState.value = {
      type: "successful",
      message: `Successfully added Record ${recordId} to database.`
    }
  }).catch((error: Error) => {
    state.statusDialogState.value = {
      type: "error",
      message: `An error occurred adding Record ${teamRecord.id} to database. Error message: ${error.message}.`
    }
  })
  state.statusDialogOpen.value = true;
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    if (teams.length === 0) router.push({name: 'teams_list'})
    teamSelections.value = teams;
  })

  if (router.currentRoute.value.query.teamNumber) setTeamSelection(Number(router.currentRoute.value.query.teamNumber))
  if (router.currentRoute.value.query.rubricGroupId) setRubricGroupSelection(router.currentRoute.value.query.rubricGroupId)
})

</script>
<template>
  <ViewShell class="flex flex-col gap-4">
    <TeamSelector @update:team-selection="handleTeamSelection"
                  v-model:team-selection="state.currentTeamSelection.value" :team-selections="teamSelections"/>
    <RubricGroupSelector @update:rubric-group-selection="handleRubricGroupSelection"
                         v-model:rubric-group-selection="state.currentRubricGroupSelection.value"
                         :rubric-group-selections="rubricGroupSelections"/>
    <RecordLab mode="create" @create="handleRecordLabSubmission" v-if="rubricReady"
               v-model:student-records="state.studentRecords.value"/>
    <StatusDialog @close="handleStatusDialogClose" v-if="!!state.statusDialogState.value"
                  :type="state.statusDialogState.value.type" :message="state.statusDialogState.value.message"
                  v-model:dialog-open="state.statusDialogOpen.value"/>
  </ViewShell>
</template>

<style scoped>

</style>
