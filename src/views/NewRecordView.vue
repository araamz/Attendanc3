<script setup lang="ts">



import ViewShell from "../components/ViewShell.vue";
import VerticalStack from "../components/VerticalStack.vue";
import RadioSelector from "../components/RadioSelector.vue";
import {ITeam, IStudent, ITeamRecord, IStudentRecord} from "../types.ts";
import {computed, onBeforeMount, Ref, ref, watch} from "vue";
import { v4 as uuid } from 'uuid';
import {useRouter} from "vue-router";
import {useDatabase} from "../composables/useDatabase.ts";

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
  <ViewShell>
    <VerticalStack>
      <VerticalStack>
        <button @click="() => router.push({query: {
          teamNumber: 32,
          studentId: '33232333dfdf23'
        }})">
          Change
        </button>
      </VerticalStack>
    </VerticalStack>
  </ViewShell>
</template>

<style scoped>

</style>
