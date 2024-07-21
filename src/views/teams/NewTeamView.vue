<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {IStudent, ITeam} from "../../types.ts";
import {ref, watch} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Dialog from "../../components/Dialog.vue";
import TeamInformationForm, {ITeamInformationFormData} from "../../components/TeamInformationForm.vue";
import StudentForm from "../../components/StudentForm.vue";

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

const handleStudentInformationSubmission = (studentInformation: IStudent) => {
  console.log(studentInformation)
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
    <StudentForm  form-id="studentInformation" @submit="handleStudentInformationSubmission" />
  </Dialog>
</template>

<style scoped>

</style>

