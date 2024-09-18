<script setup lang="ts">

import {inject, ref, Ref} from "vue";

const selectedRecordReports: Ref<Array<ITeamRecord>> = inject('selectedRecordReports')

interface IReportViewState {
  floaterReportDialogState: Ref<ITeamRecord | null>;
  floaterReportDialogOpen: Ref<boolean>;
}
const state: IReportViewState = {
  floaterReportDialogOpen: ref<boolean>(false),
  floaterReportDialogState: ref<ITeamRecord | null>(null)
}

const handleReportItemDeselection = (teamRecord: ITeamRecord) => {
  console.log(selectedRecordReports.value.length)

  selectedRecordReports.value = selectedRecordReports.value.filter((record: ITeamRecord) => record.id !== teamRecord.id)
}

const handleFloaterReportDialog = (record: ITeamRecord) => {
  state.floaterReportDialogState.value = record;
  state.floaterReportDialogOpen.value = true;
}

import ViewShell from "../components/ViewShell.vue";
import ReportItem from "../components/ReportItem.vue";
import GridContainer from "../components/GridContainer.vue";
import {ITeamRecord} from "../types.ts";
import FloaterReport from "../components/FloaterReport.vue";
import PlaceholderMessage from "../components/PlaceholderMessage.vue";
</script>

<template>
  <ViewShell>
    <PlaceholderMessage v-if="selectedRecordReports.length === 0" message="Uh oh...Please select records to show.">
      <template #routerLink>
        <RouterLink :to="{name: 'records_list'}">
          Select Records
        </RouterLink>
      </template>
    </PlaceholderMessage>
    <GridContainer v-if="selectedRecordReports.length > 0">
      <ReportItem @remove="handleReportItemDeselection" @show="handleFloaterReportDialog" v-for="report in selectedRecordReports" :team-record="report"/>
    </GridContainer>
    <FloaterReport v-model:floater-report-dialog-open="state.floaterReportDialogOpen.value" v-model:team-record="state.floaterReportDialogState.value" />
  </ViewShell>
</template>

<style scoped>

</style>
