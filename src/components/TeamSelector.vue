<template>
  <InputContainer label="Team Selection" class="@container/team-selector">
    <div
        class="grid grid-cols-2 gap-4 @md/team-selector:grid-cols-3 @lg/team-selector:grid-cols-4 @xl/team-selector:flex  @xl/team-selector:flex-row @xl/team-selector:flex-wrap">
      <label
          v-for="team in teamSelections"
          :key="team.teamNumber"
          :for="team.teamNumber"
          class="group has-[:checked]:bg-slate-600 has-[:checked]:text-white transition-colors flex flex-row justify-between items-center bg-neutral-100 p-3 rounded-md gap-3 @xl/team-selector:max-w-[160px] @xl/team-selector:w-[160px]"
      >
        <input :form="team.teamNumber"  class="appearance-none hidden" type="radio" :id="String(team.teamNumber)" v-model="teamSelectionModel" :value="team">
        <div class="flex flex-col *:leading-none gap-1 peer-checked:text-white">
          <p class="font-semibold text-lg line-clamp-1">
            {{ generalized ? `#${team.teamNumber}` : team.nickname || `#${team.teamNumber}` }}
          </p>
          <p class="text-xs font-medium text-nowrap">
            Section {{ team.section }}
          </p>
          <p class="text-xs text-neutral-400 group-has-[:checked]:text-white font-medium">
            Table {{team.table}}
          </p>
        </div>
      </label>
    </div>
  </InputContainer>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {ITeam} from '../types';
import InputContainer from "./InputContainer.vue";

const {teamSelections, generalized} = defineProps<{
  teamSelections: ITeam[];
  generalized?: boolean;
}>();

const teamSelectionModel = defineModel<ITeam | undefined>('teamSelection')

</script>
