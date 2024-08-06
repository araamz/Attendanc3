<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {onBeforeMount, ref, Ref, watch} from "vue";
import {useDatabase} from "../../composables/useDatabase.ts";
import {useRouter} from "vue-router";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";
import {IFormData, ITeam} from "../../types.ts";
import {ITeamFormValidation} from "../../components/TeamForm.vue";
import ConfirmationDialog from "../../components/ConfirmationDialog.vue";

const router = useRouter();
const {getSingleTeam, updateTeam, deleteTeam} = useDatabase()

interface ITeamEditViewState {
  team: Ref<ITeam | undefined>;
  status: Ref<'failure' | 'fresh' | 'stale' | 'updated' | 'error'>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
  confirmationDialogOpen: Ref<boolean>;
}

const state: ITeamEditViewState = {
  team: ref<ITeam | undefined>(undefined),
  status: ref('failure'),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null),
  confirmationDialogOpen: ref<boolean>(false)
}

watch(state.statusDialogState, () => {
  if (state.statusDialogState.value?.type === "error") {
    state.statusDialogOpen.value = true;
  }
})

onBeforeMount(() => {
  getSingleTeam(Number(router.currentRoute.value.params.teamNumber)).then((team) => {
    state.team.value = team;
    state.status.value = 'fresh';
  }).catch((error) => {
    if (error.name === "UnknownTeam") {
      state.statusDialogState.value = {
        type: "error",
        message: error.message
      }
    } else {
      state.statusDialogState.value = {
        type: "error",
        message: `An unknown database error occurred while searching Team #${router.currentRoute.value.params.teamNumber} in database.`
      }
    }
    state.status.value = 'failure';
    state.statusDialogOpen.value = true;
  })
})

const handleStatusDialogClose = () => {
  if (state.status.value === 'failure' || state.status.value === 'updated') {
    router.push({name: 'team_list'})
  }
  return;
}

const handleUpdatedTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data === null) return;
  updateTeam(team.data).then(() => {
    state.statusDialogState.value = {
      type: "successful",
      message: `Team #${Number(router.currentRoute.value.params.teamNumber)} has been updated in database.`,
    }
    state.status.value = 'updated';
    state.statusDialogOpen.value = true;
  })
}

const handleTeamDeletion = () => {
  state.statusDialogOpen.value = false;
  state.confirmationDialogOpen.value = true;

}

const deleteTeamAction = () => {
  deleteTeam(Number(router.currentRoute.value.params.teamNumber)).then(() => {
    state.confirmationDialogOpen.value = false;
    state.statusDialogState.value = {
      type: "successful",
      message: `Team #${Number(router.currentRoute.value.params.teamNumber)} has been deleted from the database.`,
    }
    state.status.value = 'updated';
    state.statusDialogOpen.value = true;
  })
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
  <ConfirmationDialog v-if="state.status.value !== 'failure'"  :message="`Delete Team #${router.currentRoute.value.params.teamNumber} from database?`" action-button-label="Delete Team" :action-button-handler="deleteTeamAction" :dialog-open="state.confirmationDialogOpen.value" />
</template>

<style scoped>

</style>
