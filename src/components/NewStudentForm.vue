<template>
  <div>
    <Input label="First Name" type="text" placeholder="John" v-model="firstName" />
    <Input label="Last Name" type="text" placeholder="Doe" v-model="lastName" />
    <Input label="Preferred Name" type="text" placeholder="JD" v-model="preferredName" />
  </div>
</template>

<script setup lang="ts">

  import Input from "./Input.vue";

  const firstName = defineModel<string>("firstName")
  const lastName = defineModel<string>("lastName")
  const preferredName = defineModel<string>("preferredName")

</script>

<style scoped>

</style>