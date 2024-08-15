<script setup lang="ts">



import {ITeam} from "../../types.ts";
import {onBeforeMount, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useDatabase} from "../../composables/useDatabase.ts";
import Dialog from "../../components/Dialog.vue";
import TeamSelector from "../../components/TeamSelector.vue";
import RecordLab from "../../components/RecordLab.vue";

const router = useRouter();
const {getAllTeams, getSingleTeam} = useDatabase();

interface INewRecordViewState {
  teamSelectorDialogOpen: Ref<boolean>;
  teamSelections: Ref<Array<ITeam>>;
  currentTeamSelection: Ref<ITeam | undefined>;
}
const state: INewRecordViewState = {
  teamSelectorDialogOpen: ref<boolean>(true),
  teamSelections: ref<Array<ITeam>>([]),
  currentTeamSelection: ref<ITeam | undefined>(undefined)
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    state.teamSelections.value = teams;
  })
})

const handleTeamSelection = () => {
  console.log("Running", state.currentTeamSelection.value)
  if (state.currentTeamSelection.value !== undefined) {
    router.push({
      query: {
        teamNumber: state.currentTeamSelection.value.teamNumber
    }})
  }
}

onBeforeMount(() => {
  if (router.currentRoute.value.query.teamNumber !== undefined) {
    getSingleTeam(Number(router.currentRoute.value.query.teamNumber)).then((team) => {
      state.currentTeamSelection.value = team;
      state.teamSelectorDialogOpen.value = false;
    });
  }
})

watch(state.currentTeamSelection, () => {
  console.log('NewRecordView', state.currentTeamSelection.value === undefined)
})

</script>
<template>
  <Dialog :dialog-open="state.teamSelectorDialogOpen.value" action-button-label="Select Team" :action-button-handler="handleTeamSelection" :action-button-handler-disabled="state.currentTeamSelection.value === undefined" >
      <TeamSelector v-model="state.currentTeamSelection.value" :team-selections="state.teamSelections.value" />
  </Dialog>
  <RecordLab v-if="router.currentRoute.value.query.teamNumber" mode="create" />
</template>

<style scoped>

</style>
