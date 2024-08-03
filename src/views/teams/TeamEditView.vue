<script setup lang="ts">
import TeamLab from "../../components/TeamLab.vue";
import {onBeforeMount, ref, Ref, watch} from "vue";
import {useDatabase} from "../../composables/useDatabase.ts";
import {useRouter} from "vue-router";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";
import {ITeam} from "../../types.ts";

const router = useRouter();
const {getSingleTeam} = useDatabase()

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
    if (team === undefined) {
      const error = new Error()
      error.name = "UnknownTeam"
      error.message = `Team #${router.currentRoute.value.params.teamNumber} is not found in the database.`
      throw error
    }
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


</script>


<template>
  <TeamLab
      v-if="state.team.value !== null"
      team-lab-mode="edit"
      :team-number="String(state.team.value?.teamNumber)"
      :nickname="String(state.team.value?.nickname)"
      :table="String(state.team.value?.table)"
      :section="String(state.team.value?.section)"
      :mentor="String(state.team.value?.mentor)"
      :assigned-students="state.team.value?.assignedStudents"
  />
  <StatusDialog v-if="state.statusDialogState.value !== null" :type="state.statusDialogState.value.type"
                v-model:dialog-open="state.statusDialogOpen.value" :message="state.statusDialogState.value.message"
                @close="handleStatusDialogClose()"/>
</template>

<style scoped>

</style>
