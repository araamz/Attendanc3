<template>
  <div class="flex flex-col gap-4 md:flex-row-reverse">
    <Section title="Assign Students" class="md:flex-grow">
      <template #icon>
        <UserIcon/>
      </template>
      <VerticalStack>
        <GridContainer>
          <StudentItem v-for="student in state.assignedStudents.value" :key="student.id" :id="student.id"
                       :first-name="student.firstName" :last-name="student.lastName"
                       :preferred-pronouns="student.preferredPronouns" :notes="student.notes"
                       :preferred-name="student.preferredName"
                       :edit-button-handler="() => toggleStudentEditorDialog(true, student)"
                       :delete-button-handler="() => handleStudentItemDeleteButton()"/>

          <GridButton :onclick="() => toggleStudentCreatorDialog(true)" label="NEW STUDENT">
            <template #icon>
              <PlusIcon/>
            </template>
          </GridButton>
        </GridContainer>
      </VerticalStack>
    </Section>
    <Section title="Create Team" class="md:w-[300px] md:max-w-[400px]">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <PaperContainer>
        <VerticalStack>
          <TeamForm form-id="teamForm" v-model:assigned-students="state.assignedStudents.value"/>
          <HorizontalStack>
            <Button form="teamForm" type="submit">Create</Button>
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
          action-button-label="Create Student">
    <template #icon>
      <UserIcon/>
    </template>
    <StudentForm ref="studentFormReference" form-id="studentFormEditor" @submit="handleStudentEditorSubmission" />
  </Dialog>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue";
import {IFormData, IStudent, ITeam} from "../types.ts";
import {UserGroupIcon, UserPlusIcon, UserIcon, PlusIcon} from "@heroicons/vue/20/solid";
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
  teamNumber?: string;
  nickname?: string;
  table?: string;
  section?: string;
  mentor?: string;
  assignedStudents?: Array<IStudent>;
}

const props = defineProps<ITeamLabProps>()

export interface ITeamLabState {
  teamNumber: Ref<string>;
  nickname: Ref<string>;
  table: Ref<string>;
  section: Ref<string>;
  mentor: Ref<string>;
  assignedStudents: Ref<Array<IStudent>>;
  studentEditorTarget: Ref<IStudent | null>;
  studentEditorDialogOpen: Ref<boolean>;
  studentCreatorDialogOpen: Ref<boolean>;
}

const state: ITeamLabState = {
  teamNumber: ref<string>(props.teamNumber ? props.teamNumber : ""),
  nickname: ref<string>(props.nickname ? props.nickname : ""),
  table: ref<string>(props.table ? props.table : ""),
  section: ref<string>(props.section ? props.section : ""),
  mentor: ref<string>(props.mentor ? props.mentor : ""),
  assignedStudents: ref<Array<IStudent>>(props.assignedStudents ? props.assignedStudents : []),
  studentEditorTarget: ref<IStudent | null>(null),
  studentEditorDialogOpen: ref<boolean>(false),
  studentCreatorDialogOpen: ref<boolean>(false),
}

interface ITeamLabEmits {
  (event: 'createTeam', data: ITeam): void
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

const handleStudentItemDeleteButton = () => {
  console.log("handleStudentItemDeleteButton");
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
  updateStudent(updatedStudent.data);
  toggleStudentEditorDialog(false)
}

const handleTeamCreatorSubmission = (newTeam: IFormData<ITeam, ITeamFormValidation>) => {
  if (newTeam.data === null) return;
  emit('createTeam', newTeam.data)
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