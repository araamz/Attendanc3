<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {IStudent, ITeam} from "../../types.ts";
import {ref, watch} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import {v4 as uuid} from 'uuid';
import NewStudentForm from "../../components/NewStudentForm.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Dialog from "../../components/Dialog.vue";
import TeamInformationForm, {ITeamInformationFormData} from "../../components/TeamInformationForm.vue";

const studentFormOpen = ref(false)

const teamState = ref<ITeam>({
  number: undefined,
  nickname: "",
  table: undefined,
  section: undefined,
  mentor: "",
  assignedStudents: []
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

const addStudent = () => {
  const newStudentObject: IStudent = {
    id: uuid(),
    firstName: '',
    lastName: '',
    preferredName: '',
    preferredPronouns: ''
  }
  teamState.value.assignedStudents.push(newStudentObject);
}

const removeStudent = (index: number) => {
  teamState.value.assignedStudents.splice(index, 1)
}

const handleTeamInformationSubmission = (teamInformation: ITeamInformationFormData) => {
  teamState.value = {
    ...teamState.value,
    number: teamInformation.number,
    nickname: teamInformation.nickname,
    table: teamInformation.table,
    section: teamInformation.section,
    mentor: teamInformation.mentor
  }
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
      </PaperContainer>
    </Section>
    <Section title="Assigned Students">
      <template #icon>
        <UserIcon />
      </template>
      <VerticalStack>
        <VerticalStack>
          <NewStudentForm :key="student.id" v-for="(student, index) in teamState.assignedStudents"
                          v-model:first-name="student.firstName"
                          v-model:last-name="student.lastName" v-model:preferred-name="student.preferredName"
                          v-model:preferredPronouns="student.preferredPronouns"
                          :remove-function="() => removeStudent(Number(index))" :index="index"/>
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
    <NewStudentForm />
  </Dialog>
</template>

<style scoped>

</style>

