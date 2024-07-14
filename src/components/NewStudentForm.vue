<template>
  <div>
    <input type="text" placeholder="John" v-model="firstName">
    <input type="text" placeholder="Doe" v-model="lastName">
    <input type="text" placeholder="JD" v-model="preferredName">
  </div>
</template>

<script setup lang="ts">

  const firstName = defineModel<string>("firstName")
  const lastName = defineModel<string>("lastName")
  const preferredName = defineModel<string>("preferredName")

</script>

<style scoped>

</style>