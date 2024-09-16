<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {onBeforeMount, ref, Ref, watch} from "vue";
import {useDatabase} from "../../composables/useDatabase.ts";
import {useRouter} from "vue-router";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";
import {IFormData, ITeam} from "../../types.ts";
import {ITeamFormValidation} from "../../components/TeamForm.vue";

const router = useRouter();
const {getSingleTeam, updateTeam, deleteTeam} = useDatabase()

const unknownTeamState: IStatusDialogProps = {
  type: "error",
  message: `Team #${router.currentRoute.value.params.teamNumber} is not in database.`
}
const failureTeamState: IStatusDialogProps = {
  type: "error",
  message: `Unknown error fetching Team #${router.currentRoute.value.params.teamNumber} from database.`
}
const updatingErrorTeamState: IStatusDialogProps = {
  type: "error",
  message: `Error updating Team #${router.currentRoute.value.params.teamNumber} in database.`
}
const deletingErrorTeamState: IStatusDialogProps = {
  type: "error",
  message: `Error deleting Team #${router.currentRoute.value.params.teamNumber} in database.`
}
const updatedTeamState: IStatusDialogProps = {
  type: "successful",
  message: `Team #${router.currentRoute.value.params.teamNumber} is successfully updated in database.`,
}
const deletedTeamState: IStatusDialogProps = {
  type: "successful",
  message: `Team #${router.currentRoute.value.params.teamNumber} is successfully deleted in database.`
}

interface ITeamEditViewState {
  team: Ref<ITeam | undefined>;
  status: Ref<'failure' | 'fresh' | 'stale' | 'updated' | 'error'>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
}

const state: ITeamEditViewState = {
  team: ref<ITeam | undefined>(undefined),
  status: ref('fresh'),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null),
}

onBeforeMount(() => {
  getSingleTeam(Number(router.currentRoute.value.params.teamNumber)).then((team) => {
    state.team.value = team;
    state.status.value = 'fresh'
  }).catch((error: Error) => {
    state.status.value = 'failure'
    if (error.name === "UnknownTeam") {
      state.statusDialogState.value = unknownTeamState;
    } else {
      state.statusDialogState.value = failureTeamState;
    }
    state.statusDialogOpen.value = true;
  })
})

const handleStatusDialogClose = () => {
  if (state.status.value === 'failure' || state.status.value === 'updated') {
    router.push({name: 'teams_list'})
  }
  if (state.status.value === 'error' || state.status.value === 'fresh') {
    state.status.value = 'stale'
  }
  state.statusDialogOpen.value = false;
}

watch(state.status, () => {
  console.log(state.status.value)
})

const handleUpdatedTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>): void => {
  if (team.data === null) return;
  updateTeam(team.data).then(() => {
    state.status.value = 'updated'
    state.statusDialogState.value = updatedTeamState;
    state.statusDialogOpen.value = true;
  }).catch(() => {
    state.status.value = 'error'
    state.statusDialogState.value = updatingErrorTeamState;
    state.statusDialogOpen.value = true;
  })
}

const handleTeamDeletion = () => {
  deleteTeam(Number(router.currentRoute.value.params.teamNumber)).then(() => {
    state.statusDialogState.value = deletedTeamState;
    state.status.value = 'updated'
  }).catch(() => {
    state.statusDialogState.value = deletingErrorTeamState;
    state.statusDialogOpen.value = true;
    state.status.value = 'error'
  })
  state.statusDialogOpen.value = true;
}

</script>


<template>
  <TeamLab
      v-if="state.team.value"
      mode="edit"
      :team-number="state.team.value?.teamNumber"
      :nickname="state.team.value?.nickname"
      :table="state.team.value?.table"
      :section="state.team.value?.section"
      :mentor="String(state.team.value?.mentor)"
      :assigned-students="state.team.value?.assignedStudents"
      @submit="handleUpdatedTeamSubmission"
      @delete="handleTeamDeletion"
  />
  <StatusDialog v-if="state.statusDialogState.value !== null" :type="state.statusDialogState.value.type"
                v-model:dialog-open="state.statusDialogOpen.value" :message="state.statusDialogState.value.message"
                @close="handleStatusDialogClose"/>
</template>

<style scoped>

</style>
