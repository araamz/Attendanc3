<template>
  <div class="flex flex-col gap-4 md:flex-row-reverse">
    <Section title="Assigned Students" class="md:flex-grow">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <VerticalStack>
        <GridContainer>
          <StudentItem v-for="student in state.assignedStudents.value" :key="student.id" :id="student.id"
                       :first-name="student.firstName" :last-name="student.lastName"
                       :preferred-pronouns="student.preferredPronouns" :notes="student.notes"
                       :preferred-name="student.preferredName"
                       :edit-button-handler="() => toggleStudentEditorDialog(true, student)"
                       :delete-button-handler="() => handleStudentItemDeleteButton(student)"/>

          <GridButton :onclick="() => toggleStudentCreatorDialog(true)" label="NEW STUDENT">
            <template #icon>
              <PlusIcon/>
            </template>
          </GridButton>
        </GridContainer>
      </VerticalStack>
    </Section>
    <Section title="Team Information" class="md:w-[300px] md:max-w-[400px]">
      <template #icon>
        <InformationCircleIcon />
      </template>
      <PaperContainer>
        <VerticalStack>
          <TeamForm form-id="teamForm"
                    v-model:team-number="state.teamNumber.value"
                    v-model:nickname="state.nickname.value"
                    v-model:table="state.table.value"
                    v-model:section="state.section.value"
                    v-model:mentor="state.mentor.value"
                    v-model:assigned-students="state.assignedStudents.value"
                    :freeze-team-number="mode === 'edit'"
                    @submit="handleTeamSubmission"/>
          <HorizontalStack class="justify-between">
            <Button v-if="mode === 'create'" form="teamForm" type="submit" highlighted>Create Team</Button>
            <Button v-if="mode === 'edit'" form="teamForm" type="submit" highlighted>Update Team</Button>
            <Button v-if="mode === 'edit'" :onclick="() => emit('delete')">Delete Team</Button>
          </HorizontalStack>
        </VerticalStack>
      </PaperContainer>
    </Section>
  </div>
  <Dialog title="Student Creator" :dialog-open="state.studentCreatorDialogOpen.value"
          @close="toggleStudentCreatorDialog(false)" :action-button-handler="() => handleStudentCreatorActionButton()"
          action-button-label="Create Student">
    <template #icon>
      <UserPlusIcon/>
    </template>
    <StudentForm ref="studentFormReference" form-id="studentFormCreator" @submit="handleStudentCreatorSubmission" />
  </Dialog>
  <Dialog title="Student Editor" :dialog-open="state.studentEditorDialogOpen.value"
          @close="toggleStudentEditorDialog(false)" :action-button-handler="() => handleStudentCreatorActionButton()"
          action-button-label="Update Student">
    <template #icon>
      <UserIcon/>
    </template>
    <StudentForm
        v-if="state.studentEditorTarget.value !== null"
        ref="studentFormReference"
        form-id="studentFormEditor"
        @submit="handleStudentEditorSubmission"
        :id="state.studentEditorTarget.value.id"
        :first-name="state.studentEditorTarget.value.firstName"
        :last-name="state.studentEditorTarget.value.lastName"
        :preferred-name="state.studentEditorTarget.value.preferredName"
        :preferred-pronouns="state.studentEditorTarget.value.preferredPronouns"
        :notes="state.studentEditorTarget.value.notes" />
  </Dialog>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {IFormData, IStudent, ITeam} from "../types.ts";
import {UserGroupIcon, UserPlusIcon, UserIcon, PlusIcon, InformationCircleIcon} from "@heroicons/vue/20/solid";
import VerticalStack from "./VerticalStack.vue";
import GridContainer from "./GridContainer.vue";
import GridButton from "./GridButton.vue";
import Section from "./Section.vue";
import PaperContainer from "./PaperContainer.vue";
import TeamForm, {ITeamFormValidation} from "./TeamForm.vue";
import HorizontalStack from "./HorizontalStack.vue";
import StudentForm, {IStudentFormValidation} from "./StudentForm.vue";
import Button from "./Button.vue";
import Dialog from "./Dialog.vue";
import StudentItem from "./StudentItem.vue";

export interface ITeamLabProps {
  teamNumber?: number;
  nickname?: string | null;
  table?: number;
  section?: number;
  mentor?: string;
  assignedStudents?: Array<IStudent>;
  mode: 'create' | 'edit';
}

const props = defineProps<ITeamLabProps>()
const {mode} = props;

export interface ITeamLabState {
  teamNumber: Ref<number | undefined>;
  nickname: Ref<string>;
  table: Ref<number | undefined>;
  section: Ref<number | undefined>;
  mentor: Ref<string>;
  assignedStudents: Ref<Array<IStudent>>;
  studentEditorTarget: Ref<IStudent | null>;
  studentEditorDialogOpen: Ref<boolean>;
  studentCreatorDialogOpen: Ref<boolean>;
}
const state: ITeamLabState = {
  teamNumber: ref<number | undefined>(props.teamNumber ? props.teamNumber : undefined),
  nickname: ref<string>(props.nickname ? props.nickname : ""),
  table: ref<number | undefined>(props.table ? props.table : undefined),
  section: ref<number | undefined>(props.section ? props.section : undefined),
  mentor: ref<string>(props.mentor ? props.mentor : ""),
  assignedStudents: ref<Array<IStudent>>(props.assignedStudents ? props.assignedStudents : []),
  studentEditorTarget: ref<IStudent | null>(null),
  studentEditorDialogOpen: ref<boolean>(false),
  studentCreatorDialogOpen: ref<boolean>(false),
}

interface ITeamLabEmits {
  (event: 'submit', data: IFormData<ITeam, ITeamFormValidation>): void
  (event: 'delete'): void
}

const emit = defineEmits<ITeamLabEmits>()

const studentFormReference = ref(undefined)

const addStudent = (student: IStudent): boolean => {
  if (student === null) return false
  state.assignedStudents.value.push(student)
  return true;
}

const deleteStudent = (student: IStudent): boolean => {
  if (student === null) return false
  if (!state.assignedStudents.value.some((existingStudent: IStudent) => existingStudent.id === student.id)) return false

  const studentIndex = state.assignedStudents.value.findIndex((existingStudent: IStudent) => existingStudent.id === student.id)
  state.assignedStudents.value.splice(studentIndex, 1)
  return true;
}

const updateStudent = (student: IStudent): boolean => {
  if (student === null) return false
  if (!state.assignedStudents.value.some((existingStudent: IStudent) => existingStudent.id === student.id)) return false
  const studentIndex = state.assignedStudents.value.findIndex((existingStudent: IStudent) => existingStudent.id === student.id)
  state.assignedStudents.value[studentIndex] = {
    ...student,
  }
  return true;
}

const handleStudentItemDeleteButton = (student: IStudent) => {
  deleteStudent(student)
}
const handleStudentCreatorActionButton = () => {
  if (studentFormReference.value === undefined) throw new Error('studentFormReference is undefined.');
  studentFormReference.value.forceSubmit();
}

const handleStudentCreatorSubmission = (newStudent: IFormData<IStudent, IStudentFormValidation>): void => {
  if (newStudent.data === null) return;
  addStudent(newStudent.data)
  toggleStudentCreatorDialog(false)
}

const handleStudentEditorSubmission = (updatedStudent: IFormData<IStudent, IStudentFormValidation>): void => {
  if (updatedStudent.data === null) return;
  updateStudent(updatedStudent.data)
  toggleStudentEditorDialog(false)
}

const handleTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  emit('submit', team)
}

const toggleStudentCreatorDialog = (open: boolean) => {
  state.studentCreatorDialogOpen.value = open;
}

const toggleStudentEditorDialog = (open: boolean, student?: IStudent) => {
  if (open) {
    state.studentEditorDialogOpen.value = true;
    if (!student) throw new Error("toggleStudentEditorDialog - Student is missing in open operation")
    state.studentEditorTarget.value = student;
  } else {
    state.studentEditorDialogOpen.value = false;
    state.studentEditorTarget.value = null;
  }
}

</script>

<style scoped>
</style>