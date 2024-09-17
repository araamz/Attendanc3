<script setup lang="ts">

import {useDatabase} from "../../composables/useDatabase.ts";
import {useRouter} from "vue-router";
import {computed, onBeforeMount, ref, Ref} from "vue";
import {ITeamRecord, IStudentRecord, ITeam} from "../../types.ts";
import StatusDialog, {IStatusDialogProps} from "../../components/StatusDialog.vue";
import RecordLab from "../../components/RecordLab.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Tag from "../../components/Tag.vue";

const router = useRouter()
const {getSingleRecord, updateRecord} = useDatabase();

interface IRecordEditViewState {
  teamRecord: Ref<ITeamRecord | null>;
  studentRecords: Ref<IStudentRecord>;
  statusDialogState: Ref<IStatusDialogProps | null>;
  statusDialogOpen: Ref<boolean>;
}

const state: IRecordEditViewState = {
  teamRecord: ref<ITeamRecord | null>(null),
  studentRecords: ref<IStudentRecord>([]),
  statusDialogState: ref<IStatusDialogProps | null>(null),
  statusDialogOpen: ref<boolean>(false),
}

const teamLabel = computed(() => {
  return state.teamRecord.value?.team.nickname ? `${state.teamRecord.value.team.nickname} (TEAM #${String(state.teamRecord.value.team.teamNumber)})` : `TEAM #${String(state.teamRecord.value.team.teamNumber)}`;
})

const rubricGroupLabel = computed(() => {
  return state.studentRecords.value[0].rubricGroup.label;
})

const sectionLabel = computed(() => {
  return `Section ${state.teamRecord.value.team.section}`
})

const tableLabel = computed(() => {
  return `Table ${state.teamRecord.value.team.table}`
})

const handleEditedRecordSubmission = (records: Array<IStudentRecord>) => {
  const teamRecord = {
    ...state.teamRecord.value,
    studentRecords: records,
    timestamp: new Date(state.teamRecord.value?.timestamp),
    updatedTimestamp: new Date()
  }

  updateRecord(teamRecord).then((recordId) => {
    state.statusDialogState.value = {
      type: "successful",
      message: `Successfully updated Record ${recordId} to database.`
    }
  }).catch((error: Error) => {
    state.statusDialogState.value = {
      type: "error",
      message: `An error occurred updating Record ${teamRecord.id} to database. Error message: ${error.message}.`
    }
  })
  state.statusDialogOpen.value = true;
}

const handleStatusDialogClose = () => {
  if (state.teamRecord.value === null) router.push({name: 'records_list'})
  if (state.statusDialogState.value?.type === 'error') {
    state.statusDialogState.value = null;
    state.statusDialogOpen.value = false;
  }
  router.push({name: 'records_list'})
}

onBeforeMount(() => {
  if (router.currentRoute.value.params.recordId !== undefined) {
    getSingleRecord(router.currentRoute.value.params.recordId).then((record: ITeamRecord) => {
      state.teamRecord.value = record;
      state.studentRecords.value = record.studentRecords;
    }).catch((error: Error) => {
      if (error.name === 'UnknownRecord') {
        state.statusDialogState.value = {
          type: "error",
          message: error.message,
        }
      } else {
        state.statusDialogState.value = {
          type: "error",
          message: `An error occurred from database. Error message: ${error.message}.`
        }
      }
      state.statusDialogOpen.value = true;
    })
  }
})


</script>

<template>
  <div v-if="!!state.teamRecord.value" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1.5 md:flex-row md:justify-between md:items-center">
      <p class="font-semibold text-lg leading-none">
        {{ rubricGroupLabel }}
      </p>
      <div class="flex flex-col gap-1">
        <p class="font-medium text-sm leading-none text-neutral-400 italic">
          Created at {{ state.teamRecord.value.timestamp }}
        </p>
        <p v-if="state.teamRecord.value.updatedTimestamp"
           class="font-medium text-sm leading-none text-neutral-400 italic">
          Updated at {{ state.teamRecord.value.updatedTimestamp }}
        </p>
      </div>
    </div>
    <PaperContainer class="flex flex-row justify-between items-center">
      <div class="flex flex-col md:flex-row md:items-center md:gap-2">
        <p class="font-medium">
          {{ teamLabel }}
        </p>
        <p class="text-sm text-neutral-400 font-medium">
          {{ state.teamRecord.value.team.mentor }}
        </p>
      </div>
      <div class="flex flex-row gap-2 items-center">
        <Tag v-if="state.teamRecord.value?.team.section" :label="sectionLabel"/>
        <Tag v-if="state.teamRecord.value?.team.table" :label="tableLabel"/>
      </div>
    </PaperContainer>
    <RecordLab @update="(data: Array<IStudentRecord>) => handleEditedRecordSubmission(data)" mode="update" v-model:student-records="state.studentRecords.value"/>
  </div>
  <StatusDialog v-if="state.statusDialogState.value" @close="() => handleStatusDialogClose()" :type="state.statusDialogState.value?.type" :message="state.statusDialogState.value?.message" v-model:dialog-open="state.statusDialogOpen.value" />
</template>

<style scoped>

</style>
