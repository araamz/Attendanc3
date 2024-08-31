<template>
  <div class="flex flex-col gap-4">
    <div v-if="team" class="flex flex-row gap-2 items-center md:justify-start md:gap-4">
      <div class="flex flex-col">
        <p class="font-semibold text-lg">
          {{ team.nickname || `TEAM #${team.teamNumber}` }}
        </p>
        <p class="text-neutral-400 text-sm font-semibold"
           v-if="rubricGroup">
          {{ rubricGroup.label }}
        </p>
      </div>
      <Button class="flex items-center gap-2 ml-auto" :disable-option="!state.currentStudentSelection.value"
              :onclick="openStudentInformationDialog">
        <div class="flex items-center gap-2">
        <span>
          <InformationCircleIcon class="size-4"/>
        </span>
          <span>
          Student Information
        </span>
        </div>
      </Button>
    </div>
    <StudentSelector v-model:student-selection="state.currentStudentSelection.value"
                     :student-selections="team?.assignedStudents || []"/>
    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2" v-if="rubricGroup && state.currentStudentSelection.value">
      <RubricForm v-for="rubric in rubricGroup.rubrics" :rubric="rubric"/>
    </div>
    <ScrollButton label="Submit Record">
      <template #icon>
        <ClipboardDocumentCheckIcon />
      </template>
    </ScrollButton>
  </div>
  <Dialog v-model:dialog-open="state.studentInformationDialogOpen.value">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col" v-for="(value, key) in processedStudentInformation">
        <p class="text-xs font-semibold text-neutral-400 uppercase">
          {{ key }}
        </p>
        <p class="font-medium">
          {{ value }}
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {IRubricGroup, IStudent, IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {computed, onBeforeMount, ref, Ref, watch} from "vue";
import {ClipboardDocumentCheckIcon} from "@heroicons/vue/16/solid";
import StudentSelector from "./StudentSelector.vue";
import {useRouter} from "vue-router";
import RubricForm from "./RubricForm.vue";
import Button from "./Button.vue";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";
import Dialog from "./Dialog.vue";
import ScrollButton from "./ScrollButton.vue";

const router = useRouter();

export interface IRecordLabProps {
  team?: ITeam;
  rubricGroup?: IRubricGroup;
  mode: 'create' | 'edit';
}

const {team, rubricGroup, mode} = defineProps<IRecordLabProps>();

export interface IRecordLabEmits {
  (event: 'delete'): void;
  (event: 'update', data: IStudentRecord): void;
}

onBeforeMount(() => {
  if (router.currentRoute.value.query.student !== undefined && team !== undefined) {
    state.currentStudentSelection.value = team.assignedStudents.find((student: IStudent) => student.id === router.currentRoute.value.query.student)
  }
})


interface IRecordLabState {
  studentInformationDialogOpen: Ref<boolean>;
  currentStudentSelection: Ref<IStudent | undefined>;
  studentRecords: Ref<Array<IStudentRecord>>;
}

const state: IRecordLabState = {
  studentInformationDialogOpen: ref<boolean>(false),
  currentStudentSelection: ref<IStudent | undefined>(),
  studentRecords: ref<Array<IStudentRecord>>([])
}

watch(state.currentStudentSelection, () => {
  console.log('RecordLab', 'watch', state.currentStudentSelection);
  if (state.currentStudentSelection.value !== undefined) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        student: state.currentStudentSelection.value.id
      }
    })
  }
})

const processedStudentInformation = computed(() => {

  if (state.currentStudentSelection.value === undefined) return undefined;

  let processedStudentInformationObject = {
    id: state.currentStudentSelection.value.id,
    "First Name": state.currentStudentSelection.value.firstName,
    "Last Name": state.currentStudentSelection.value.lastName,
    "Preferred Pronouns": state.currentStudentSelection.value.preferredPronouns,
  }

  if (state.currentStudentSelection.value === undefined) return undefined;

  if (state.currentStudentSelection.value.preferredName !== null) {
    processedStudentInformationObject["Preferred Name"] = state.currentStudentSelection.value.preferredName
  }

  if (state.currentStudentSelection.value.notes !== null) {
    processedStudentInformationObject["Notes"] = state.currentStudentSelection.value.notes
  }

  console.log(processedStudentInformationObject)

  return processedStudentInformationObject

})

const openStudentInformationDialog = () => {
  state.studentInformationDialogOpen.value = true;
}

</script>

<style scoped>

</style>