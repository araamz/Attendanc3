<template>
  <GridItem>

  </GridItem>
</template>

<script setup lang="ts">

  import {IStudent} from "../types.ts";
  import GridItem from "./GridItem.vue";

  const {firstName, lastName, preferredName, preferredPronouns} = defineProps<IStudent>()

</script>

<style scoped>

</style>