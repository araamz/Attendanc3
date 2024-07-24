<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {IStudent, ITeam} from "../../types.ts";
import {ref, watch} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Dialog from "../../components/Dialog.vue";
import TeamInformationForm, {ITeamInformationFormData} from "../../components/TeamForm.vue";
import StudentForm from "../../components/StudentForm.vue";
import HorizontalStack from "../../components/HorizontalStack.vue";
import IconButton from "../../components/IconButton.vue";

const studentFormOpen = ref(false)

const teamState = defineModel<ITeam>("teamState", {
  default: {
    number: undefined,
    nickname: "",
    table: undefined,
    section: undefined,
    mentor: "",
    assignedStudents: []
  }
});

watch(teamState, () => {
  console.log(teamState.value);
})

const openStudentForm = () => {
  studentFormOpen.value = true;
}
const closeStudentForm = () => {
  studentFormOpen.value = false;
}

const addStudent = (student: IStudent) => {
  teamState.value.assignedStudents.push(student);
}
const removeStudent = (index: number) => {
  teamState.value.assignedStudents.splice(index, 1)
}

const handleTeamInformationSubmission = (teamInformation: ITeamInformationFormData) => {
  teamState.value = {
    ...teamState.value,
    teamNumber: teamInformation.number,
    nickname: teamInformation.nickname,
    table: teamInformation.table,
    section: teamInformation.section,
    mentor: teamInformation.mentor
  }
}

const handleStudentInformationSubmission = (studentInformation: IStudent) => {
  if (studentInformation === null) return;
  console.log("ADDING STUDENT", studentInformation)
  addStudent(studentInformation)

}

</script>

<template>
  <VerticalStack spacing="lg">
    <Section title="Team Information">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <PaperContainer>
        <TeamInformationForm form-id="teamInformation" @submit="handleTeamInformationSubmission" />
        <IconButton type="submit" form="teamInformation">
          <template #icon>
            <PlusIcon />
          </template>
        </IconButton>
      </PaperContainer>
    </Section>
    <Section title="Assigned Students">
      <template #icon>
        <UserIcon />
      </template>
      <VerticalStack>
        <VerticalStack>
        </VerticalStack>
        <ScrollButton :onclick="() => openStudentForm()" label="New Student">
          <template #icon>
            <PlusIcon/>
          </template>
        </ScrollButton>
      </VerticalStack>
    </Section>
  </VerticalStack>
  <Dialog title="Assign Student" v-model:dialogOpen="studentFormOpen" @close="closeStudentForm">
    <template #icon>
      <UserPlusIcon />
    </template>
    <VerticalStack spacing="lg">
      <StudentForm  form-id="studentInformation" @submit="handleStudentInformationSubmission" />
      <HorizontalStack class="justify-between">
        <IconButton type="submit" form="studentInformation">
          <template #icon>
            <PlusIcon />
          </template>
        </IconButton>
        <IconButton :onclick="closeStudentForm">
          <template #icon>
            <XMarkIcon />
          </template>
        </IconButton>
      </HorizontalStack>
    </VerticalStack>
  </Dialog>
</template>

<style scoped>

</style>

