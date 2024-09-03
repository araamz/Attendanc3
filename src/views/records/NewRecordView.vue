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
const rubricGroups: Array<IRubricGroup> = inject('rubricGroups') || []
const {getAllTeams, getSingleTeam, createRecord} = useDatabase();

interface INewRecordViewState {
  teamSelectorDialogOpen: Ref<boolean>;
  teamSelections: Ref<Array<ITeam>>;
  currentTeamSelection: Ref<ITeam | undefined>;
  currentRubricGroupSelection: Ref<IRubricGroup | undefined>;
  studentRecords: Ref<Array<IStudentRecord>>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
}

const state: INewRecordViewState = {
  teamSelectorDialogOpen: ref<boolean>(true),
  teamSelections: ref<Array<ITeam>>([]),
  currentTeamSelection: ref<ITeam | undefined>(undefined),
  currentRubricGroupSelection: ref<IRubricGroup | undefined>(undefined),
  studentRecords: ref([]),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null)
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    state.teamSelections.value = teams;
  })
  if (router.currentRoute.value.query.teamNumber !== undefined) {
    getSingleTeam(Number(router.currentRoute.value.query.teamNumber)).then((team) => {
      state.currentTeamSelection.value = team;
      state.teamSelectorDialogOpen.value = false;
    }).catch((error) => {
      console.log(error)
    });
  }

  if (router.currentRoute.value.query.rubricGroup !== undefined) {
    state.currentRubricGroupSelection.value = rubricGroups.find((rubricGroup: IRubricGroup) => rubricGroup.id === router.currentRoute.value.query.rubricGroup)
  }
})

watch(router.currentRoute, () => {
  console.log('Router Watch')
  if (router.currentRoute.value.query.teamNumber === undefined && state.currentTeamSelection.value !== undefined) {
    state.currentTeamSelection.value = undefined;
    state.teamSelectorDialogOpen.value = true;
  }
})

const handleTeamSelection = () => {
  if (state.currentTeamSelection.value !== undefined && state.currentRubricGroupSelection.value !== undefined) {
    router.push({
      query: {
        teamNumber: state.currentTeamSelection.value.teamNumber,
        rubricGroup: state.currentRubricGroupSelection.value.id
      }
    })
    state.teamSelectorDialogOpen.value = false;
  }
}

const rubricCreatorDisabled = computed(() => {
  return state.currentTeamSelection.value === undefined || state.currentRubricGroupSelection.value === undefined;
})

const handleTeamSelectorDialogClose = () => {
  router.push({
    name: 'teams_list'
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

</script>
<template>
  <ViewShell>
    <RecordLab v-if="router.currentRoute.value.query.teamNumber && state.currentTeamSelection.value" :rubric-group="state.currentRubricGroupSelection.value" :team="state.currentTeamSelection.value"
               mode="create" @create="handleNewRecordSubmission"/>
    <Dialog :dialog-open="state.teamSelectorDialogOpen.value" action-button-label="Create Rubric"
            :action-button-handler="handleTeamSelection" :action-button-handler-disabled="rubricCreatorDisabled"
            @close="handleTeamSelectorDialogClose">
      <VerticalStack spacing="lg">
        <TeamSelector v-model="state.currentTeamSelection.value" :team-selections="state.teamSelections.value"/>
        <RubricGroupSelector v-model="state.currentRubricGroupSelection.value" :rubric-group-selections="rubricGroups"/>
      </VerticalStack>
    </Dialog>
    <StatusDialog v-if="!!state.statusDialogState.value" :type="state.statusDialogState.value?.type" :message="state.statusDialogState.value?.message" v-model:dialog-open="state.statusDialogOpen.value" @close="handleStatusDialogClose" />
  </ViewShell>
</template>

<style scoped>

</style>
