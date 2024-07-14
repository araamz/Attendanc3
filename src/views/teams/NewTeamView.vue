<script setup lang="ts">
  import ScrollButton from "../../components/ScrollButton.vue";
  import {PlusIcon} from "@heroicons/vue/16/solid";
  import {IStudent, ITeam} from "../../types.ts";
  import {ref, watch} from "vue";
  import VerticalStack from "../../components/VerticalStack.vue";
  import { v4 as uuidv4 } from 'uuid';
  import NewStudentForm from "../../components/NewStudentForm.vue";

  const teamState = ref<ITeam>({
      number:  "",
      nickname: "",
      table: "",
      section: "",
      mentor: "",
      assignedStudents: []
  });

  watch(teamState.value.assignedStudents, () => {
    console.log(teamState.value.assignedStudents);
  })

  const addStudent = () => {
    const newStudentObject: IStudent = {
      id: uuidv4(),
      firstName: '',
      lastName: '',
      preferredName: '',
      pronouns: ''
    }
    teamState.value.assignedStudents.push(newStudentObject);
  }

  const showData = () => {
    console.log(teamState.value.assignedStudents);
  }



</script>

<template>
  <VerticalStack>
    <form>
      <label class="flex gap-2">
        Team Number
        <input type="number" placeholder="123" v-model="teamState.number" />
      </label>
      <label>
        Team Nickname
        <input type="text" placeholder="TestTeam" v-model="teamState.nickname" />
      </label>
      <label class="flex gap-2">
        Assigned Table
        <input type="number" placeholder="4" v-model="teamState.table" />
      </label>
      <label class="flex gap-2">
        Class Section
        <input type="number" placeholder="1204" v-model="teamState.section" />
      </label>
      <label class="flex gap-2">
        Mentor
        <input type="text" placeholder="Albert Einstein" v-model="teamState.mentor" />
      </label>
    </form>
    <VerticalStack>
      <VerticalStack>
        <button :onclick="showData">
          Show Data
        </button>
        <NewStudentForm v-for="student in teamState.assignedStudents" v-model:first-name="student.firstName" v-model:last-name="student.lastName" v-model:preferred-name="student.preferredName" />
      </VerticalStack>
      <ScrollButton :onclick="() => addStudent()" label="New Student">
        <template #icon>
          <PlusIcon />
        </template>
      </ScrollButton>
    </VerticalStack>
  </VerticalStack>
</template>

<style scoped>

</style>
