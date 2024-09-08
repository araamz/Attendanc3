<template>
  <GridItem class="group has-[:checked]:bg-slate-600 has-[:checked]:text-white transition-colors">
    <label class="group">
      <VerticalStack class="w-full h-full">
        <input class="appearance-none hidden" type="radio" :id="String(props.teamNumber)" v-model="model" :value="props">
        <HorizontalStack class="justify-between items-center">
          <p class="font-medium">
            TEAM #{{ props.teamNumber }}
          </p>
          <p class="has-[:checked]:text-white text-neutral-400  font-medium leading-0 text-sm">
            {{ props.nickname }}
          </p>
        </HorizontalStack>
        <DescriptorContainer class="mb-auto" >
          <Descriptor :text-color-disable="selected" label="Table" :value="String(props.table)"/>
          <Descriptor :text-color-disable="selected"  label="Section" :value="String(props.section)"/>
          <Descriptor :text-color-disable="selected"  label="Mentor" :value="props.mentor"/>
        </DescriptorContainer>
      </VerticalStack>
    </label>
  </GridItem>
</template>

<script setup lang="ts">

import GridItem from "./GridItem.vue";
import {ITeam} from "../types.ts";
import HorizontalStack from "./HorizontalStack.vue";
import Descriptor from "./Descriptor.vue";
import VerticalStack from "./VerticalStack.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import {computed} from "vue";

const props = defineProps<ITeam>()
const model = defineModel<ITeam | undefined>('teamSelection')
const selected = computed(() => model.value === props)

</script>

<style scoped>

</style>