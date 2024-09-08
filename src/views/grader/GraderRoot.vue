<script setup lang="ts">


import {IRubricGroup, IStudentRecord, ITeam, ITeamRecord} from "../../types.ts";
import {computed, inject, onBeforeMount, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useDatabase} from "../../composables/useDatabase.ts";
import Dialog from "../../components/Dialog.vue";
import TeamSelector from "../../components/TeamSelector.vue";
import RecordLab from "../../components/RecordLab.vue";
import RubricGroupSelector from "../../components/RubricGroupSelector.vue";
import VerticalStack from "../../components/VerticalStack.vue";
import ViewShell from "../../components/ViewShell.vue";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";

const router = useRouter();
const rubricGroupSelections: Array<IRubricGroup> = inject('rubricGroups') || []
const {getAllTeams, getSingleTeam, createRecord} = useDatabase();

interface INewRecordViewState {
  selectorDialogOpen: Ref<boolean>;
  teamSelections: Ref<Array<ITeam>>;
  currentTeamSelection: Ref<ITeam | undefined>;
  currentRubricGroupSelection: Ref<IRubricGroup | undefined>;
  studentRecords: Ref<Array<IStudentRecord>>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
  rubricReady: Ref<boolean>;
}

const state: INewRecordViewState = {
  selectorDialogOpen: ref<boolean>(true),
  teamSelections: ref<Array<ITeam>>([]),
  currentTeamSelection: ref<ITeam | undefined>(undefined),
  currentRubricGroupSelection: ref<IRubricGroup | undefined>(undefined),
  studentRecords: ref([]),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null),
  rubricReady: ref<boolean>(false)
}

const setTeamSelection = (teamNumber: string) => {
  getSingleTeam(teamNumber).then((team: ITeam) => {
    state.currentTeamSelection.value = team
  }).catch((error: Error) => {
    console.error("NewRecordView", "setTeamSelection", "Error", teamNumber)
  })
}
const setRubricGroupSelection = (rubricGroupId: string) => {
  const rubricGroup = rubricGroupSelections.find((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)
  if (rubricGroup) {
    state.currentRubricGroupSelection.value = rubricGroup;
  } else {
    console.error("NewRecordView", "setRubricGroupSelection", "Error", rubricGroupId)
  }
}

const handleTeamSelection = (team: ITeam | undefined) => {
  console.log("handleTeamSelection", "TEST", team);
  if (!team?.teamNumber) return
  console.log("handleTeamSelection", "PASS", team);
  router.push({
    params: {
      teamNumber: Number(team.teamNumber),
    }
  })
}
const handleRubricGroupSelection = (rubricGroup: IRubricGroup | undefined) => {
  console.log("handleRubricGroupSelection", "TEST", rubricGroup);
  if (!rubricGroup) return
  console.log("handleRubricGroupSelection", "PASS", rubricGroup);
  router.push({
    params: {
      rubricGroupId: rubricGroup.id
    }
  })
}

const handleNewRecordSubmission = (record: ITeamRecord) => {
  createRecord(record).then((response) => {
    state.statusDialogState.value = {
      type: "successful",
      message: `Successfully saved Record ${record.id} for Team #${record.team.teamNumber} to database.`
    }
  }).catch(error => {
    state.statusDialogState.value = {
      type: "error",
      message: `Error occurred saving Record ${record.id} for Team #${record.team.teamNumber} to database. ${error.message}`
    }
  })
  state.statusDialogOpen.value = true;
}

const handleStatusDialogClose = () => {
  if (state.statusDialogState.value?.type === "successful") {
    router.push({name: 'records_list'})
  }
  state.statusDialogOpen.value = false;
}

const handleTeamSelectorDialogClose = () => {
  router.push({
    name: 'teams_list'
  })
}

const rubricCreatorDisabled = computed(() => {
  return !state.currentTeamSelection.value || !state.currentRubricGroupSelection.value;
})

const prepareRubric = (teamNumber: string, rubricGroupId: string) => {
  router.push({
    params: {
      teamNumber: Number(teamNumber),
      rubricGroupId: rubricGroupId
    }
  })
  state.rubricReady.value = true
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    state.teamSelections.value = teams;
  })

  if (router.currentRoute.value.params.teamNumber && router.currentRoute.value.params.rubricGroupId) {
    prepareRubric(router.currentRoute.value.params.teamNumber, router.currentRoute.value.params.rubricGroupId)
  } else {
    router.replace({
      params: {
        teamNumber: '',
        rubricGroupId: ''
      }
    })
  }
})

</script>
<template>
  <ViewShell>
    <router-view />
  </ViewShell>
</template>

<style scoped>

</style>
