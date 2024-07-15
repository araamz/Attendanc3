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
  assignedNumber: undefined,
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

</script>

<template>
  <VerticalStack>
    <div>
      <Input type="number" label="Team Number" placeholder="123" v-model="teamState.assignedNumber" />
      <label>
        Team Nickname
        <input type="text" placeholder="TestTeam" v-model="teamState.nickname"/>
      </label>
      <label class="flex gap-2">
        Assigned Table
        <input type="number" placeholder="4" v-model.number="teamState.table"/>
      </label>
      <label class="flex gap-2">
        Class Section
        <input type="number" placeholder="1204" v-model.number="teamState.section"/>
      </label>
      <label class="flex gap-2">
        Mentor
        <input type="text" placeholder="Albert Einstein" v-model="teamState.mentor"/>
      </label>
    </div>
    <VerticalStack>
      <VerticalStack>
        <NewStudentForm v-for="student in teamState.assignedStudents" v-model:first-name="student.firstName"
                        v-model:last-name="student.lastName" v-model:preferred-name="student.preferredName"/>
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
