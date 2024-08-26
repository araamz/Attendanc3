<template>
  <HorizontalStack>
    <RubricSlice v-model="rubricSliceModel" v-for="slice in slices" :key="slice.id" :slice="slice" />
  </HorizontalStack>
</template>

<script setup lang="ts">

import {IRubricSlice} from "../types.ts";
import RubricSlice from "./RubricSlice.vue";
import HorizontalStack from "./HorizontalStack.vue";

interface IRubricSliceSelectorProps {
  slices: Array<IRubricSlice>;
}
const {slices} = defineProps<IRubricSliceSelectorProps>()

const rubricSliceModel = defineModel<IRubricSlice>()

</script>

<style scoped>

</style>