<template>
  <PaperContainer>
    <p class="text-xs font-semibold text-neutral-400 uppercase">
      Team Selection
    </p>
    <div class="flex flex-row flex-wrap gap-4">
      <div class="flex flex-row items-center basis-1/2 bg-neutral-100 pr-4 pl-2 py-2 rounded-md gap-2" v-for="team in teamSelections">
        <div class="flex flex-col *:leading-none gap-1">
          <p class="font-medium line-clamp-1">
            {{ team.nickname ? team.nickname : `#${team.teamNumber}` }}
          </p>
          <p class="text-sm">
            Table {{team.table}}
          </p>
          <p class="text-sm">
            Section {{team.section}}
          </p>
        </div>
        <button>
          <InformationCircleIcon class="size-6 text-neutral-400" />
        </button>
      </div>
    </div>
  </PaperContainer>
</template>

<script setup lang="ts">

import {IFormData, ITeam} from "../types.ts";
import {computed} from "vue";
import PaperContainer from "./PaperContainer.vue";
import IconButton from "./IconButton.vue";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";

interface ITeamSelectorProps {
  teamSelections: Array<ITeam>;
  generalized?: boolean;
}
const {teamSelections, generalized} = defineProps<ITeamSelectorProps>()

const selectionModel = defineModel<ITeam | undefined>('currentTeamSelection')

</script>

<style scoped>

</style>