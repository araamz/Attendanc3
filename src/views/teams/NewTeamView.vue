<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon, UserIcon} from "@heroicons/vue/20/solid";
import {computed, ref} from "vue";
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

const studentAssignmentFormOpen = ref(false)

const toggleStudentAssignmentForm = (state: boolean): void => {
  studentAssignmentFormOpen.value = state;
}

const assignedStudents = ref<Array<IStudent>>([])

const handleTeamSubmission = (team: IFormData<ITeam, ITeamFormValidation>) => {
  if (team.data === null) return;
}

const handleStudentSubmission = (student: IFormData<IStudent, IStudentFormValidation>): void => {
  if (student.data !== null) toggleStudentAssignmentForm(false)
  else return
  assignedStudents.value.push(student.data)
}

</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row-reverse">
    <Section title="Assigned Students" class="md:flex-grow">
      <template #icon>
        <UserIcon />
      </template>
      <VerticalStack>
        <GridContainer>
          <StudentItem v-for="student in assignedStudents"
                       :key="student.id"
                       :id="student.id"
                       :first-name="student.firstName"
                       :last-name="student.lastName"
                       :preferred-name="student.preferredName"
                       :preferred-pronouns="student.preferredPronouns"
                       :notes="student.notes"
          />
          <button :onclick="() => toggleStudentAssignmentForm(true)" label="New Student">
            <PaperContainer class="flex flex-col gap-4 text-neutral-300 place-items-center place-content-center aspect-square rounded-md hover:text-slate-600 ">
              <span>
                <PlusIcon class="size-16" />
              </span>
              <p class="font-medium">
                NEW STUDENT
              </p>
            </PaperContainer>
          </button>
        </GridContainer>
      </VerticalStack>
    </Section>
    <Section title="Team Information" class="md:w-[300px] md:max-w-[400px]">
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
  </div>
  <Dialog title="Assign Student" v-model:dialogOpen="studentAssignmentFormOpen" @close="() => toggleStudentAssignmentForm(false)">
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
        <IconButton :onclick="() => toggleStudentAssignmentForm(false)">
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

