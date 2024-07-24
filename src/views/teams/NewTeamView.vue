<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {ref, watch} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Dialog from "../../components/Dialog.vue";
import HorizontalStack from "../../components/HorizontalStack.vue";
import IconButton from "../../components/IconButton.vue";
import TeamForm, {ITeamFormValidation} from "../../components/TeamForm.vue";
import StudentForm, {IStudentFormValidation} from "../../components/StudentForm.vue";
import {IFormData, IStudent, ITeam} from "../../types.ts";

const studentFormOpen = ref(false)

const toggleStudentForm = (state: boolean): void => {
  studentFormOpen.value = state;
}

const assignedStudents = ref<Array<IStudent>>([])

const handleTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  console.log(team)
  if (team.data === null) return;
}

const handleStudentSubmission = (student: IFormData<IStudent, IStudentFormValidation>): void => {
  if (student.data !== null) toggleStudentForm(false)
  else return
  console.log("ADDING STUDENT", student.data)
  assignedStudents.value.push(student.data)
}

watch(assignedStudents.value, () => {
  console.log(assignedStudents.value)
})

</script>

<template>
  <VerticalStack spacing="lg">
    <Section title="Team Information">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <PaperContainer>
        <TeamForm form-id="teamForm" v-model:assigned-students="assignedStudents" @submit="handleTeamSubmission" />
        <IconButton type="submit" form="teamForm">
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
          <p v-for="student in assignedStudents">
            {{student.firstName}}
          </p>
        </VerticalStack>
        <ScrollButton :onclick="() => toggleStudentForm(true)" label="New Student">
          <template #icon>
            <PlusIcon/>
          </template>
        </ScrollButton>
      </VerticalStack>
    </Section>
  </VerticalStack>
  <Dialog title="Assign Student" v-model:dialogOpen="studentFormOpen" @close="() => toggleStudentForm(false)">
    <template #icon>
      <UserPlusIcon />
    </template>
    <VerticalStack spacing="lg">
      <StudentForm form-id="studentInformation" @submit="handleStudentSubmission" />
      <HorizontalStack class="justify-between">
        <IconButton type="submit" form="studentInformation">
          <template #icon>
            <PlusIcon />
          </template>
        </IconButton>
        <IconButton :onclick="() => toggleStudentForm(false)">
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

