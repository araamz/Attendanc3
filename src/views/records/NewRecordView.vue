<script setup lang="ts">



import ViewShell from "../../components/ViewShell.vue";
import VerticalStack from "../../components/VerticalStack.vue";
import {ITeam, IStudent} from "../../types.ts";
import {onBeforeMount, Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useDatabase} from "../../composables/useDatabase.ts";
import RecordForm from "../../components/RecordForm.vue";
import RecordLab from "../../components/RecordLab.vue";

const router = useRouter();
const {getAllTeams} = useDatabase();

interface INewRecordViewState {
  currentTeamSelection: Ref<number | undefined>;
  teamSelections: Ref<Array<ITeam>>;
  currentStudentSelection: Ref<string | undefined>;
  studentSelections: Ref<Array<IStudent>>;
}
const state: INewRecordViewState = {
  currentTeamSelection: Number(router.currentRoute.value.query.teamNumber),
  teamSelections: ref([]),
  currentStudentSelection: ref(null),
  studentSelections: ref([]),
}

onBeforeMount(() => {
  console.log("OnBeforeMount");
  getAllTeams().then((teams: Array<ITeam>) => {
    state.teamSelections.value = teams;
  })
})

watch(router.currentRoute, () => {
  console.log("SEE CHANGE")
})

</script>



<template>
  <RecordLab mode="create" />
</template>

<style scoped>

</style>
