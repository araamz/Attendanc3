<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {IFormData, ITeam} from "../../types.ts";
import {ITeamFormValidation} from "../../components/TeamForm.vue";
import {computed, Ref, ref} from "vue";
import {UserGroupIcon} from "@heroicons/vue/20/solid";
import StatusDialog from "../../components/StatusDialog.vue";

interface INewTeamViewState {
  teamSubmission: Ref<ITeam | null>;
  successfulDialogOpen: Ref<boolean>;
  errorDialogOpen: Ref<boolean>;
}
const state: INewTeamViewState = {
  teamSubmission: ref<ITeam | null>(null),
  successfulDialogOpen: ref<boolean>(false),
  errorDialogOpen: ref<boolean>(false)
}

const handleNewTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data !== null) return;
  state.successfulDialogOpen.value = true;
}

const successfulMessage = computed(() => {
  if (state.teamSubmission !== null) return `Team #${state.teamSubmission.value?.teamNumber} is successfully created.`
})

</script>

<template>
  <TeamLab @submit="handleNewTeamSubmission"/>
  <StatusDialog v-if="state.teamSubmission !== null" v-model:dialog-open="state.successfulDialogOpen.value" :title="state.teamSubmission.value?.teamNumber" type="error" :message="successfulMessage">
    <template #icon>
      <UserGroupIcon />
    </template>
  </StatusDialog>

</template>

<style scoped></style>
