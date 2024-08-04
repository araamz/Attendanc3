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

interface ITeamEditViewState {
  team: Ref<ITeam | null | undefined>;
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
}

const state: ITeamEditViewState = {
  team: ref<ITeam | null | undefined>(undefined),
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null)
}

watch(state.statusDialogState, () => {
  if (state.statusDialogState.value?.type === "error") {
    state.statusDialogOpen.value = true;
  }
})

onBeforeMount(() => {
  getSingleTeam(Number(router.currentRoute.value.params.teamNumber)).then((team) => {
    state.team.value = team;
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
    state.team.value = null;
  })
})

const handleStatusDialogClose = () => {
  if (state.team.value === null) {
    router.push({name: 'team_list'})
  }
}

const handleUpdatedTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data === null) return;
  updateTeam(team.data).then((data) => {
  })
}

const handleTeamDeletion = () => {
  deleteTeam(Number(router.currentRoute.value.params.teamNumber))
}

</script>


<template>
  <TeamLab
      v-if="state.team.value"
      mode="edit"
      :team-number="state.team.value?.teamNumber"
      :nickname="String(state.team.value?.nickname)"
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
