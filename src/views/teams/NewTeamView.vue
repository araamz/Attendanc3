<script setup lang="ts">
import ScrollButton from "../../components/ScrollButton.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, UserPlusIcon} from "@heroicons/vue/20/solid";
import {IStudent, ITeam} from "../../types.ts";
import {ref, watch} from "vue";
import VerticalStack from "../../components/VerticalStack.vue";
import {v4 as uuid} from 'uuid';
import NewStudentForm from "../../components/NewStudentForm.vue";
import Input from "../../components/InputContainer.vue";
import Section from "../../components/Section.vue";
import PaperContainer from "../../components/PaperContainer.vue";

const teamState = ref<ITeam>({
  number: undefined,
  nickname: "",
  table: undefined,
  section: undefined,
  mentor: "",
  assignedStudents: []
});

watch(teamState.value, () => {
  console.log(teamState.value.assignedStudents);
})

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

</script>

<template>
  <VerticalStack spacing="lg">
    <Section title="Team Information">
      <template #icon>
        <UserGroupIcon/>
      </template>
      <PaperContainer>
        <VerticalStack spacing="lg">
          <Input type="number" label="Team Number" placeholder="230" v-model="teamState.number"/>
          <Input type="text" label="Team Nickname" placeholder="Dream Team" v-model="teamState.nickname"/>
          <Input type="text" label="Table" placeholder="1" v-model="teamState.table"/>
          <Input type="number" label="Class Section" placeholder="1204" v-model="teamState.section"/>
          <Input type="text" label="Mentor" placeholder="John Doe" v-model="teamState.mentor"/>
        </VerticalStack>
      </PaperContainer>
    </Section>
    <Section title="Assigned Students">
      <template #icon>
        <UserPlusIcon/>
      </template>
      <VerticalStack>
        <VerticalStack>
          <NewStudentForm :key="student.id" v-for="(student, index) in teamState.assignedStudents"
                          v-model:first-name="student.firstName"
                          v-model:last-name="student.lastName" v-model:preferred-name="student.preferredName"
                          v-model:preferredPronouns="student.preferredPronouns"
                          :remove-function="() => removeStudent(Number(index))" :index="index"/>
        </VerticalStack>
        <ScrollButton :onclick="() => addStudent()" label="New Student">
          <template #icon>
            <PlusIcon/>
          </template>
        </ScrollButton>
      </VerticalStack>
    </Section>
  </VerticalStack>
</template>

<style scoped>

</style>
