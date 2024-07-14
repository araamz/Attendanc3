<template>
  <div>
    <input type="text" placeholder="John" v-model="studentModel.firstName">
    <input type="text" placeholder="Doe" v-model="studentModel.lastName">
    <input type="text" placeholder="JD" v-model="studentModel.preferredName">
  </div>
</template>

<script setup lang="ts">

  const studentModel = defineModel<{
    firstName: string;
    lastName: string;
    preferredName: string;
    pronouns: string;
  }>("studentModel", {
    required: true,
    default: {
      firstName: "",
      lastName: "",
      preferredName: "",
      pronouns: ""
    }
  })

</script>

<style scoped>

</style>