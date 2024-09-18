<script setup lang="ts">
  import GridContainer from "../../components/GridContainer.vue";
  import RecordItem from "../../components/RecordItem.vue";
  import HorizontalStack from "../../components/VerticalStack.vue";
  import {useDatabase} from "../../composables/useDatabase.ts";
  import {useRouter} from "vue-router";
  import {ITeamRecord} from "../../types.ts";
  import {inject, onBeforeMount, Ref, ref, watch} from "vue";
  import PlaceholderMessage from "../../components/PlaceholderMessage.vue";

  const router = useRouter()
  const {getAllRecords} = useDatabase();
  const selectedRecordReports = inject('selectedRecordReports')

  interface IRecordsListViewState {
    teamRecords: Ref<Array<ITeamRecord>>;
  }
  const state: IRecordsListViewState = {
    teamRecords: ref<Array<ITeamRecord>>([])
  }

  onBeforeMount(() => {
    getAllRecords().then((records: Array<ITeamRecord>) => {
      state.teamRecords.value = records;
    })
  })

</script>

<template>
  <HorizontalStack>
    <PlaceholderMessage v-if="state.teamRecords.value.length === 0" message="Uh oh...No records are found.">
      <template #routerLink>
        <RouterLink :to="{name: 'grade'}">
          Create Record
        </RouterLink>
      </template>
    </PlaceholderMessage>
    <GridContainer v-if="state.teamRecords.value.length > 0">
      <RecordItem v-for="record in state.teamRecords.value" :team-record="record" v-model:selected-record-reports="selectedRecordReports" />
    </GridContainer>
  </HorizontalStack>
</template>

<style scoped>

</style>
