<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {IFormData, ITeam} from "../../types.ts";
import {ITeamFormValidation} from "../../components/TeamForm.vue";
import {Ref, ref} from "vue";
import {UserGroupIcon} from "@heroicons/vue/20/solid";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";
import {useDatabase} from "../../composables/useDatabase.ts";

const {createNewTeam} = useDatabase();

interface INewTeamViewState {
  statusDialogOpen: Ref<boolean>;
  statusDialogState: Ref<IStatusDialogProps | null>;
}
const state: INewTeamViewState = {
  statusDialogOpen: ref<boolean>(false),
  statusDialogState: ref<IStatusDialogProps | null>(null)
}

const handleNewTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  console.log(team)
  if (team.data === null) return;

  createNewTeam(team.data).then(() => {
    state.statusDialogState.value = {
      type: "successful",
      message: `Team #${team.data?.teamNumber} successfully added to database.`
    }
    state.statusDialogOpen.value = true;
  }).catch((error: Error) => {

    if (error.name === "KeyConstraint") {
      state.statusDialogState.value = {
        type: "error",
        message: `Team #${team.data?.teamNumber} already exists in the database.`
      }
    } else {
      state.statusDialogState.value = {
        type: "error",
        message: `An unknown database error occurred while adding Team #${team.data?.teamNumber}.`
      }
    }

    state.statusDialogOpen.value = true;
  })
}

</script>

<template>
  <TeamLab @submit="handleNewTeamSubmission"/>
  <StatusDialog v-if="state.statusDialogState.value !== null" v-model:dialog-open="state.statusDialogOpen.value" :type="state.statusDialogState.value.type" :message="state.statusDialogState.value!.message" />

</template>

<style scoped></style>
