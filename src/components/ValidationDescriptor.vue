<template>
  <div>
    <p>
      <span>{{formLabel}}: </span>{{message}}
    </p>
  </div>
</template>

<script setup lang="ts">

import {IValidationError} from "../types.ts";

const {formLabel, message} = defineProps<IValidationError>()

</script>

<style scoped>

</style>