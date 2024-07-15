<script setup lang="ts">
  import ScrollButton from "../../components/ScrollButton.vue";
  import {PlusIcon} from "@heroicons/vue/16/solid";
  import {IStudent, ITeam} from "../../types.ts";
  import {ref, watch} from "vue";
  import VerticalStack from "../../components/VerticalStack.vue";
  import {v4 as uuid} from 'uuid';
  import NewStudentForm from "../../components/NewStudentForm.vue";
  import Input from "../../components/Input.vue";

  const teamState = ref<ITeam>({
    number: undefined,
    nickname: "",
    table: undefined,
    section: undefined,
    mentor: "",
    assignedStudents: []
  });

  watch(teamState.value, () => {
    console.log(teamState.value);
  })

  const addStudent = () => {
    const newStudentObject: IStudent = {
      id: uuid(),
      firstName: '',
      lastName: '',
      preferredName: '',
      pronouns: ''
    }
    teamState.value.assignedStudents.push(newStudentObject);
  }

  const removeStudent = (index: number) => {
    teamState.value.assignedStudents.splice(index, 1)
  }

</script>

<template>
  <VerticalStack spacing="lg">
    <Input type="number" label="Team Number" placeholder="123" v-model="teamState.number"/>
    <Input type="text" label="Team Nickname" placeholder="Dream Team" v-model="teamState.nickname"/>
    <Input type="text" label="Table" placeholder="1" v-model="teamState.table"/>
    <Input type="number" label="Class Section" placeholder="1204" v-model="teamState.section"/>
    <Input type="text" label="Mentor" placeholder="John Doe" v-model="teamState.mentor"/>
    <VerticalStack>
      <VerticalStack>
        <NewStudentForm :key="student.id" v-for="(student, index) in teamState.assignedStudents"
                        v-model:first-name="student.firstName"
                        v-model:last-name="student.lastName" v-model:preferred-name="student.preferredName"
                        :remove-function="() => removeStudent(Number(index))" :index="index" v-model:pronouns="student.pronouns" />
      </VerticalStack>
      <ScrollButton :onclick="() => addStudent()" label="New Student">
        <template #icon>
          <PlusIcon/>
        </template>
      </ScrollButton>
    </VerticalStack>
  </VerticalStack>
</template>

<style scoped>

</style>
