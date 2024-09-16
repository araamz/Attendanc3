<script setup lang="ts">

import {computed, onBeforeMount, watch} from "vue";
import ViewShell from "../components/ViewShell.vue";
import {useDatabase} from "../composables/useDatabase.ts";
import {inject, ref, Ref} from "vue";
import StatusDialog, {IStatusDialogProps} from "../components/StatusDialog.vue";
import {IRubric, IRubricGrade, IRubricGroup, IRubricSlice, IStudent, IStudentRecord, ITeam} from "../types.ts";
import {useRouter} from "vue-router";
import TeamSelector from "../components/TeamSelector.vue";
import RubricGroupSelector from "../components/RubricGroupSelector.vue";
import PaperContainer from "../components/PaperContainer.vue";
import VerticalStack from "../components/VerticalStack.vue";
import Section from "../components/Section.vue";
import InputContainer from "../components/InputContainer.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";
import Button from "../components/Button.vue";
import IconButton from "../components/IconButton.vue";
import ScrollButton from "../components/ScrollButton.vue";
import Input from "../components/InputContainer.vue";
import RubricValidationError, {IRecordLabValidation} from "../components/RubricValidationError.vue";
import Dialog from "../components/Dialog.vue"

const router = useRouter()
const {getAllTeams, getSingleTeam} = useDatabase();
const rubricGroupSelections = inject("rubricGroupSelections");

const teamSelections = ref<Array<ITeam>>([]);

interface IGradeViewState {
  currentTeamSelection: Ref<ITeam | null>;
  currentRubricGroupSelection: Ref<IRubricGroup | null>;
  statusDialogState: Ref<IStatusDialogProps | null>;
  statusDialogOpen: Ref<boolean>;
  studentRecords: Ref<Array<IStudentRecord>>;
  recordLabStatusDialogOpen: Ref<boolean>;
  studentInformationDialogOpen: Ref<boolean>;
  currentStudentSelection: Ref<IStudent | undefined>;
}

const state: IGradeViewState = {
  currentTeamSelection: ref<ITeam | null>(null),
  currentRubricGroupSelection: ref<IRubricGroup | null>(null),
  statusDialogState: ref<IStatusDialogProps | null>(null),
  statusDialogOpen: ref<boolean>(false),
  studentRecords: ref<Array<IStudentRecord>>([]),
  recordLabStatusDialogOpen: ref<boolean>(false),
  studentInformationDialogOpen: ref<boolean>(false),
  currentStudentSelection: ref<IStudent | undefined>(undefined)
}

const rubricReady = computed(() => {
  return state.studentRecords.value.length > 0
})

interface IRecordLabValidationState {
  earnedSlice: Array<IRecordLabValidation>;
}

const validation: IRecordLabValidationState = {
  earnedSlice: ref([]),
}

watch([state.currentTeamSelection, state.currentRubricGroupSelection], ([newTeamSelection, newRubricGroupSelection]): void => {
  if (newTeamSelection === null || newRubricGroupSelection === null) return;
  state.studentRecords.value = newTeamSelection.assignedStudents.map((student: IStudent): IStudentRecord => ({
    student: student,
    rubricGroup: newRubricGroupSelection,
    grades: newRubricGroupSelection.rubrics.map((rubric: IRubric): IRubricGrade => ({
      rubric: rubric,
      earnedSlice: undefined,
      comment: ''
    }))
  }))
})

const setTeamSelection = (teamNumber: number) => {
  getSingleTeam(teamNumber).then((team) => {
    state.currentTeamSelection.value = team;
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: String(teamNumber)
      }
    })
  }).catch((error) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: undefined
      }
    })
  })
}

const setRubricGroupSelection = (rubricGroupId: string) => {
  if (rubricGroupSelections.some((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)) {
    const rubricGroupSelection = rubricGroupSelections.find((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)
    state.currentRubricGroupSelection.value = rubricGroupSelection;
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: rubricGroupId
      }
    })
  } else {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: undefined
      }
    })
  }
}

const handleTeamSelection = (team: ITeam) => {
  setTeamSelection(team.teamNumber)
}

const handleRubricGroupSelection = (rubricGroup: IRubricGroup) => {
  setRubricGroupSelection(rubricGroup.id)
}

const handleRubricSliceSelection = (record: IStudentRecord, rubric: IRubric, earnedSlice: IRubricSlice) => {
  state.studentRecords.value.map((studentRecord: IStudentRecord): IStudentRecord => {
    if (studentRecord.student.id !== record.student.id) return studentRecord;
    return {
      ...studentRecord,
      grades: studentRecord.grades.map((rubricGrade: IRubricGrade): IRubricGrade => {
        if (rubricGrade.rubric.id !== rubric.id) return rubricGrade;
        return {
          ...rubricGrade,
          earnedSlice: earnedSlice,
        }
      })
    }
  })
}

const handleRubricComment = (record: IStudentRecord, rubric: IRubric, newComment: string) => {
  state.studentRecords.value.map((studentRecord: IStudentRecord): IStudentRecord => {
    if (studentRecord.student.id !== record.student.id) return studentRecord;
    return {
      ...studentRecord,
      grades: studentRecord.grades.map((rubricGrade: IRubricGrade): IRubricGrade => {
        if (rubricGrade.rubric.id !== rubric.id) return rubricGrade;
        return {
          ...rubricGrade,
          comment: newComment,
        }
      })
    }
  })
}

const handleCommonDeduction = (record: IStudentRecord, rubric: IRubric, deduction: string) => {
  const appendDeduction = (comment: string, deduction: string) => {
    return comment.trim().length === 0 ? deduction : comment.trim() + ' ' + deduction;
  };

  state.studentRecords.value = state.studentRecords.value.map((studentRecord: IStudentRecord) => {
    if (studentRecord.student.id !== record.student.id) return studentRecord;

    const updatedGrades = studentRecord.grades.map((rubricGrade: IRubricGrade) => {
      if (rubricGrade.rubric.id !== rubric.id) return rubricGrade;

      const newComment = appendDeduction(rubricGrade.comment, deduction);
      return {
        ...rubricGrade,
        comment: newComment
      };
    });

    return {
      ...studentRecord,
      grades: updatedGrades
    };
  });
};

const handleRecordSubmission = () => {
  if (!validateRecord('earnedSlice')) {
    state.recordLabStatusDialogOpen.value = true;
    return
  }
}

const handleStatusDialogClose = () => {
  if (state.recordLabStatusDialogOpen.value) state.recordLabStatusDialogOpen.value = false
}

const handleStudentInformationDialog = (student: IStudent) => {
  state.currentStudentSelection.value = student;
  state.studentInformationDialogOpen.value = true;
}

const handleStudentInformationDialogClose = () => {
  if (!state.studentInformationDialogOpen.value) return;
  state.studentInformationDialogOpen.value = false;
  state.currentStudentSelection.value = undefined;
}

const validateRecord = (field: keyof IRecordLabValidationState): IRecordLabValidationState => {
  let fieldValid = true;
  if (field === 'earnedSlice' && !isEarnedSliceValid.value) {
    validation.earnedSlice = []
    state.studentRecords.value.forEach((studentRecord: IStudentRecord) => {
      const studentValidator: IRecordLabValidation = {
        student: studentRecord.student,
        errors: []
      }
      studentRecord.grades.map((rubricGrade: IRubricGrade) => {
        if (rubricGrade.earnedSlice === undefined) {
          fieldValid = false;
          studentValidator.errors.push({
            rubric: rubricGrade.rubric,
            message: 'Rubric Slice selection is missing.'
          })
        }
      })
      if (studentValidator.errors.length > 0) validation.earnedSlice.push(studentValidator)
    })
  }
  return fieldValid;
}

const isEarnedSliceValid = computed<boolean>(() => {
  return !state.studentRecords.value.some(studentRecord =>
      studentRecord.grades.some(rubricGrade => rubricGrade.earnedSlice === undefined)
  );
});

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

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    teamSelections.value = teams;
  })

  if (router.currentRoute.value.query.teamNumber) setTeamSelection(Number(router.currentRoute.value.query.teamNumber))
  if (router.currentRoute.value.query.rubricGroupId) setRubricGroupSelection(router.currentRoute.value.query.rubricGroupId)
})

</script>
<template>
  <ViewShell class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <TeamSelector @update:team-selection="handleTeamSelection"
                    v-model:team-selection="state.currentTeamSelection.value" :team-selections="teamSelections"/>
      <RubricGroupSelector @update:rubric-group-selection="handleRubricGroupSelection"
                           v-model:rubric-group-selection="state.currentRubricGroupSelection.value"
                           :rubric-group-selections="rubricGroupSelections"/>
    </div>
    <VerticalStack spacing="lg" v-if="rubricReady">
      <PaperContainer class="flex flex-col" v-for="studentRecord in state.studentRecords.value"
                      :key="studentRecord.student.id">
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row gap-2 items-center">
            <p class="font-medium leading-none">
              {{ `${studentRecord.student.firstName} ${studentRecord.student.lastName}` }}
            </p>
            <div class="bg-slate-200 px-2 py-1 rounded-md">
              <p class="text-xs font-medium leading-none text-slate-400">
                {{ studentRecord.student.preferredPronouns }}
              </p>
            </div>
          </div>
          <IconButton :onclick="() => handleStudentInformationDialog(studentRecord.student)">
            <template #icon>
              <InformationCircleIcon />
            </template>
          </IconButton>
        </div>
        <div class="flex flex-col gap-2.5">
          <Section v-for="rubricGrade in studentRecord.grades" :key="rubricGrade.rubric.id"
                   :title="rubricGrade.rubric.label">
            <div class="flex flex-col gap-2">
              <InputContainer label="Rubric Slices">
                <div class="flex flex-col md:grid md:grid-cols-3 gap-3">
                  <label class="group hover:bg-slate-600 hover:text-white has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 p-2 rounded-md transition-colors" v-for="slice in rubricGrade.rubric.slices">
                    <input class="outline-0 appearance-none hidden" type="radio" :value="slice" :id="`${studentRecord.student.id}-${slice.id}`" v-model="rubricGrade.earnedSlice" @change="handleRubricSliceSelection(studentRecord, rubricGrade.rubric, slice)" />
                    <div class="font-medium leading-snug">
                      <p>
                        {{ slice.score }} pts.
                      </p>
                      <p class="text-sm">
                        {{ slice.label }}
                      </p>
                    </div>
                    <p class="text-sm">
                      {{ slice.description }}
                    </p>
                  </label>
                </div>
              </InputContainer>
              <InputContainer label="Comment">
                <textarea :name="studentRecord.rubricGroup.id" rows="3" v-model="rubricGrade.comment" @change="(event) => handleRubricComment(studentRecord, rubricGrade.rubric, event.target.value)" />
              </InputContainer>
              <div class="flex flex-col gap-1 rounded-md">
                <span class="text-xs font-semibold text-neutral-400 uppercase">
                  Common Deductions
                </span>
                <div class="flex flex-wrap gap-2">
                  <button
                      class="hover:bg-slate-600 hover:text-white has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 flex items-center gap-1 py-1 px-2.5 rounded-md font-medium w-fit transition-colors"
                      v-for="commonDeduction in rubricGrade.rubric.commonDeductions" @click="handleCommonDeduction(studentRecord, rubricGrade.rubric, commonDeduction)" :key="commonDeduction">
                      <span>
                        <PlusIcon class="size-4 leading-none"/>
                      </span>
                    {{ commonDeduction }}
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </PaperContainer>
    </VerticalStack>
    <ScrollButton v-if="rubricReady" :onclick="() =>handleRecordSubmission()" label="Create Record">
      <template #icon>
        <PlusIcon />
      </template>
    </ScrollButton>
    <Dialog v-model:dialog-open="state.studentInformationDialogOpen.value" @close="handleStudentInformationDialogClose">
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
    <StatusDialog type="error" v-model:dialog-open="state.recordLabStatusDialogOpen.value" @close="handleStatusDialogClose">
      <VerticalStack spacing="lg">
        <RubricValidationError v-for="validator in validation.earnedSlice" :student="validator.student" :errors="validator.errors" :key="validator.student.id" />
      </VerticalStack>
    </StatusDialog>
  </ViewShell>
</template>

<style scoped>

</style>
