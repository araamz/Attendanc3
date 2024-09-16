<template>
  <VerticalStack spacing="lg">
    <PaperContainer class="flex flex-col gap-2" v-for="studentRecord in studentRecordsModel"
                    :key="studentRecord.student.id">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row gap-2 items-center">
          <p class="font-medium leading-none">
            {{ studentRecord.student.preferredName ? `${studentRecord.student.preferredName} (${studentRecord.student.firstName} ${studentRecord.student.lastName})` : `${studentRecord.student.firstName} ${studentRecord.student.lastName}` }}
          </p>
          <Tag :label="studentRecord.student.preferredPronouns" />
        </div>
        <IconButton :onclick="() => handleStudentInformationDialog(studentRecord.student)">
          <template #icon>
            <InformationCircleIcon/>
          </template>
        </IconButton>
      </div>
      <div class="flex flex-col gap-3">
        <Section v-for="rubricGrade in studentRecord.grades" :key="rubricGrade.rubric.id"
                 :title="rubricGrade.rubric.label" class="border-2 border-slate-200 p-3 rounded-md">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1 rounded-md">
              <span class="text-xs font-semibold text-neutral-400 uppercase">
                Rubric Slices
              </span>
              <div class="flex flex-col md:grid md:grid-cols-3 gap-3">
                <label
                    class="group hover:bg-slate-600 hover:text-white has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 p-2 rounded-md transition-colors"
                    v-for="slice in rubricGrade.rubric.slices">
                  <input class="outline-0 appearance-none hidden" type="radio" :value="slice"
                         :id="`${studentRecord.student.id}-${slice.id}`" v-model="rubricGrade.earnedSlice"
                         @change="handleRubricSliceSelection(studentRecord, rubricGrade.rubric, slice)"/>
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
            </div>
            <InputContainer label="Comment">
              <textarea :name="studentRecord.rubricGroup.id" rows="3" v-model="rubricGrade.comment"
                        @change="(event) => handleRubricComment(studentRecord, rubricGrade.rubric, event.target.value)"/>
            </InputContainer>
            <div class="flex flex-col gap-1 rounded-md">
                <span class="text-xs font-semibold text-neutral-400 uppercase">
                  Common Deductions
                </span>
              <div class="flex flex-wrap gap-2">
                <button
                    class="hover:bg-slate-600 hover:text-white has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 flex items-center gap-1 py-1 px-2.5 rounded-md font-medium w-fit transition-colors"
                    v-for="commonDeduction in rubricGrade.rubric.commonDeductions"
                    @click="handleCommonDeduction(studentRecord, rubricGrade.rubric, commonDeduction)"
                    :key="commonDeduction">
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
  <div class="flex flex-col w-full">
    <ScrollButton v-if="mode === 'create'" :onclick="() => handleRecordSubmission()" label="Create Record">
      <template #icon>
        <DocumentPlusIcon/>
      </template>
    </ScrollButton>
    <ScrollButton v-if="mode === 'update'" :onclick="() => handleRecordSubmission()" label="Update Record">
      <template #icon>
        <DocumentArrowUpIcon/>
      </template>
    </ScrollButton>
  </div>
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
  <StatusDialog type="error" v-model:dialog-open="state.recordLabStatusDialogOpen.value"
                @close="handleStatusDialogClose">
    <VerticalStack spacing="lg">
      <RubricValidationError v-for="validator in validation.earnedSlice" :student="validator.student"
                             :errors="validator.errors" :key="validator.student.id"/>
    </VerticalStack>
  </StatusDialog>
</template>

<script setup lang="ts">

import {IRubric, IRubricGrade, IRubricSlice, IStudent, IStudentRecord, ITeam} from "../types.ts";
import {computed, ref, Ref} from "vue";
import StatusDialog, {IStatusDialogProps} from "./StatusDialog.vue";
import RubricValidationError, {IRecordLabValidation} from "./RubricValidationError.vue";
import {DocumentPlusIcon, DocumentArrowUpIcon, PlusIcon} from "@heroicons/vue/16/solid";
import Input from "./InputContainer.vue";
import ScrollButton from "./ScrollButton.vue";
import VerticalStack from "./VerticalStack.vue";
import PaperContainer from "./PaperContainer.vue";
import IconButton from "./IconButton.vue";
import Section from "./Section.vue";
import InputContainer from "./InputContainer.vue";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";
import Button from "./Button.vue";
import Dialog from "./Dialog.vue";
import Tag from "./Tag.vue";

interface IRecordLabProps {
  mode: 'create' | 'update';
}

const {mode} = defineProps<IRecordLabProps>()

interface IRecordLabEmits {
  (event: 'create', data: Array<IStudentRecord>): void;
  (event: 'update', data: Array<IStudentRecord>): void;
}
const emit = defineEmits<IRecordLabEmits>();

const studentRecordsModel = defineModel<Array<IStudentRecord>>('studentRecords');

interface IGradeViewState {
  statusDialogState: Ref<IStatusDialogProps | null>;
  statusDialogOpen: Ref<boolean>;
  recordLabStatusDialogOpen: Ref<boolean>;
  studentInformationDialogOpen: Ref<boolean>;
  currentStudentSelection: Ref<IStudent | undefined>;
}

const state: IGradeViewState = {
  statusDialogState: ref<IStatusDialogProps | null>(null),
  statusDialogOpen: ref<boolean>(false),
  recordLabStatusDialogOpen: ref<boolean>(false),
  studentInformationDialogOpen: ref<boolean>(false),
  currentStudentSelection: ref<IStudent | undefined>(undefined)
}

interface IRecordLabValidationState {
  earnedSlice: Array<IRecordLabValidation>;
}

const validation: IRecordLabValidationState = {
  earnedSlice: ref([]),
}

const handleRubricSliceSelection = (record: IStudentRecord, rubric: IRubric, earnedSlice: IRubricSlice) => {
  studentRecordsModel.value.map((studentRecord: IStudentRecord): IStudentRecord => {
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
  studentRecordsModel.value.map((studentRecord: IStudentRecord): IStudentRecord => {
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

  studentRecordsModel.value = studentRecordsModel.value.map((studentRecord: IStudentRecord) => {
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

  if (mode === 'create') emit('create', studentRecordsModel.value)
  if (mode === 'update') emit('update', studentRecordsModel.value)
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
    studentRecordsModel.value.forEach((studentRecord: IStudentRecord) => {
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
  return !studentRecordsModel.value.some(studentRecord =>
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

</script>

<style scoped>

</style>