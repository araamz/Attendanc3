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
      <StudentRecordLab v-if="rubricGroup && state.currentStudentSelection.value" :student-record="currentStudentRecord" @record-update="data => {console.log(data)}" />
    <ScrollButton :onclick="() =>{console.log('RecordLab', state.studentRecords.value)}" label="Submit Record">
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
  <StatusDialog type="" dialog-open="">

  </StatusDialog>
</template>

<script setup lang="ts">
import {IRubric, IRubricGrade, IRubricGroup, IStudent, IStudentRecord, ITeam, ITeamRecord} from "../types.ts";
import {computed, onBeforeMount, ref, Ref, watch} from "vue";
import {ClipboardDocumentCheckIcon} from "@heroicons/vue/16/solid";
import StudentSelector from "./StudentSelector.vue";
import {useRouter} from "vue-router";
import RubricForm from "./RubricForm.vue";
import Button from "./Button.vue";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";
import Dialog from "./Dialog.vue";
import ScrollButton from "./ScrollButton.vue";
import StudentRecord from "./StudentRecordLab.vue";
import StudentRecordLab from "./StudentRecordLab.vue";
import StatusDialog, {IStatusDialogProps} from "./StatusDialog.vue";

const router = useRouter();

export interface IRecordLabProps {
  team?: ITeam;
  rubricGroup?: IRubricGroup;
  completeStudentRecords?: Array<IStudentRecord>;
  mode: 'create' | 'edit';
}

const {team, rubricGroup, completeStudentRecords,  mode} = defineProps<IRecordLabProps>();

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
  recordLabStatusDialogState: Ref<IStatusDialogProps | null>,
  recordLabStatusDialogOpen: false,
  studentInformationDialogOpen: ref<boolean>(false),
  currentStudentSelection: ref<IStudent | undefined>(),
  studentRecords: ref<Array<IStudentRecord>>([])
}

onBeforeMount(() => {
  if (mode === 'create') {
    state.studentRecords.value = team.assignedStudents.map((student: IStudent) => {
      return {
        student: student,
        grades: rubricGroup.rubrics.map((rubric: IRubric) => {
          return {
            rubric: rubric,
            earnedSlice: undefined,
            comment: ""
          }
        }),
        rubricGroup: rubricGroup
      }
    })
  } else {
    state.studentRecords.value = completeStudentRecords
  }
})

watch(state.currentStudentSelection, () => {
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

  return processedStudentInformationObject

})

const openStudentInformationDialog = () => {
  state.studentInformationDialogOpen.value = true;
}

const currentStudentRecord = computed(() => {
  return state.studentRecords.value.find((studentRecord: IStudentRecord) => studentRecord.student.id === state.currentStudentSelection.value?.id)
})

interface IRecordLabValidation {
  earnedSlice: Array<{
    student: IStudent;
    errors: Array<{
      rubric: IRubric;
      message: string;
    }>
  }> | null;
}
const validation: IRecordLabValidation = {
  earnedSlice: ref(null),
}

const validateRecord = (field: keyof IRecordLabValidation): IRecordLabValidation => {
  if (field === 'earnedSlice') validation.earnedSlice = null;

  if (field === 'earnedSlice') {
    const errors: Array<{
      student: IStudent;
      errors: Array<{
        rubric: IRubric;
        message: string;
      }>;
    }
    state.studentRecords.value.filter((studentRecord: IStudentRecord) => {
      studentRecord.grades.map((rubricGrade: IRubricGrade) => {
        if (rubricGrade.earnedSlice === undefined) {
        }
      })
    })
  }
}
</script>

<style scoped>

</style>