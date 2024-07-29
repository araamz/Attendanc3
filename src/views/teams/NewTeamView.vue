<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {IFormData, ITeam} from "../../types.ts";
import {ITeamFormValidation} from "../../components/TeamForm.vue";
import VerticalStack from "../../components/VerticalStack.vue";
import Dialog from "../../components/Dialog.vue";
import {ref} from "vue";

const teamSubmission = ref<ITeam | null>(null);
const submissionFailure = ref<ITeamFormValidation | null>(null);
const successfulDialog = ref<boolean>(false);
const unsuccessfulDialog = ref<boolean>(false);

const handleNewTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data === null) {
    submissionFailure.value = team.validation
  } else {
    successfulDialog.value = true;
    teamSubmission.value = team.data
  }
}

</script>

<template>
  <TeamLab @submit="handleNewTeamSubmission"/>
  <Dialog :v-if="teamSubmission !== null" title="Team Created" :dialog-open="successfulDialog">
    <VerticalStack>
      <p class="font-semibold">
        Team {{teamSubmission?.teamNumber}} Created!
      </p>
    </VerticalStack>
  </Dialog>
</template>

<style scoped></style>
