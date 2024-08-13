<template>
  <div class="flex flex-col gap-2 md:grid md:grid-flow-col">
    <RubricSlice />
    <RubricSlice />
    <RubricSlice />
    <RubricSlice />
    <RubricSlice />
  </div>
</template>

<script setup lang="ts">

import HorizontalStack from "./HorizontalStack.vue";
import RubricSlice from "./RubricSlice.vue";
import VerticalStack from "./VerticalStack.vue";
</script>

<style scoped>

</style>