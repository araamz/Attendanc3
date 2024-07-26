<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {ref} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";
import Dialog from "../../components/Dialog.vue";
import HorizontalStack from "../../components/HorizontalStack.vue";
import IconButton from "../../components/IconButton.vue";
import TeamForm, {ITeamFormValidation} from "../../components/TeamForm.vue";
import StudentForm, {IStudentFormValidation} from "../../components/StudentForm.vue";
import {IFormData, IStudent, ITeam} from "../../types.ts";
import GridContainer from "../../components/GridContainer.vue";
import GridItem from "../../components/GridItem.vue";
import StudentItem from "../../components/StudentItem.vue";

const studentFormOpen = ref(false)

const toggleStudentForm = (state: boolean): void => {
  studentFormOpen.value = state;
}

const assignedStudents = ref<Array<IStudent>>([])

const handleTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data === null) return;
}

const handleStudentSubmission = (student: IFormData<IStudent, IStudentFormValidation>): void => {
  if (student.data !== null) toggleStudentForm(false)
  else return
  assignedStudents.value.push(student.data)
}

</script>

<template>
  <VerticalStack spacing="lg">
    <Section title="Assigned Students">
      <template #icon>
        <UserIcon />
      </template>
      <VerticalStack>
        <GridContainer>
          <StudentItem v-for="student in assignedStudents" />
        </GridContainer>
        <ScrollButton :onclick="() => toggleStudentForm(true)" label="New Student">
          <template #icon>
            <PlusIcon/>
          </template>
        </ScrollButton>
      </VerticalStack>
    </Section>
    <Section title="Team Information">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <PaperContainer>
        <VerticalStack spacing="lg">
          <TeamForm form-id="teamForm" v-model:assigned-students="assignedStudents" @submit="handleTeamSubmission" />
          <HorizontalStack>
            <IconButton type="submit" form="teamForm">
              <template #icon>
                <PlusIcon />
              </template>
            </IconButton>
          </HorizontalStack>
        </VerticalStack>
      </PaperContainer>
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

