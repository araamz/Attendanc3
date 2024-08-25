<script setup lang="ts">


import {IRubricGroup, ITeam} from "../../types.ts";
import {computed, inject, onBeforeMount, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useDatabase} from "../../composables/useDatabase.ts";
import Dialog from "../../components/Dialog.vue";
import TeamSelector from "../../components/TeamSelector.vue";
import RecordLab from "../../components/RecordLab.vue";
import RubricGroupSelector from "../../components/RubricGroupSelector.vue";
import VerticalStack from "../../components/VerticalStack.vue";
import ViewShell from "../../components/ViewShell.vue";

const router = useRouter();
const rubricGroups: Array<IRubricGroup> = inject('rubricGroups') || []
const {getAllTeams, getSingleTeam} = useDatabase();

interface INewRecordViewState {
  teamSelectorDialogOpen: Ref<boolean>;
  teamSelections: Ref<Array<ITeam>>;
  currentTeamSelection: Ref<ITeam | undefined>;
  currentRubricGroupSelection: Ref<IRubricGroup | undefined>;
}

const state: INewRecordViewState = {
  teamSelectorDialogOpen: ref<boolean>(true),
  teamSelections: ref<Array<ITeam>>([]),
  currentTeamSelection: ref<ITeam | undefined>(undefined),
  currentRubricGroupSelection: ref<IRubricGroup | undefined>(undefined)
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
})

watch(router.currentRoute, () => {
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

const buttonDisabled = computed(() => {
  return state.currentTeamSelection.value === undefined || state.currentRubricGroupSelection.value === undefined;
})

const handleTeamSelectorDialogClose = () => {
  router.push({
    name: 'teams_list'
  })
}

</script>
<template>
  <ViewShell>
    <RecordLab v-if="router.currentRoute.value.query.teamNumber && state.currentTeamSelection.value" :rubric-group="state.currentRubricGroupSelection.value" :team="state.currentTeamSelection.value"
               mode="create"/>
    <Dialog :dialog-open="state.teamSelectorDialogOpen.value" action-button-label="Create Rubric"
            :action-button-handler="handleTeamSelection" :action-button-handler-disabled="buttonDisabled"
            @close="handleTeamSelectorDialogClose">
      <VerticalStack spacing="lg">
        <TeamSelector v-model="state.currentTeamSelection.value" :team-selections="state.teamSelections.value"/>
        <RubricGroupSelector v-model="state.currentRubricGroupSelection.value" :rubric-group-selections="rubricGroups"/>
      </VerticalStack>
    </Dialog>
  </ViewShell>
</template>

<style scoped>

</style>
