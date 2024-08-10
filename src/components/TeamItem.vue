<script setup lang="ts">
import {IStudent, ITeam} from "../types.ts";
import VerticalStack from "./VerticalStack.vue";
import Descriptor from "./Descriptor.vue";
import IconButton from "./IconButton.vue";
import {PencilIcon} from "@heroicons/vue/16/solid";
import DescriptorContainer from "./DescriptorContainer.vue";
import HorizontalStack from "./HorizontalStack.vue";
import GridItem from "./GridItem.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";

const {teamNumber, nickname, table, section, mentor, assignedStudents} = defineProps<ITeam>()

const router = useRouter();
const navigateEditTeamView = () => {
  router.push({
    name: "team_editor",
    params: {
      teamNumber: teamNumber
    }
  });
}

const studentNames = computed(() => assignedStudents.map((student: IStudent) => {
      return student.preferredName ? `${student.firstName} ${student.lastName} (${student.preferredName})` : `${student.firstName} ${student.lastName}`;
    }).join(', ')
)

</script>

<template>
  <GridItem class="flex @container/team-item box-content">
    <VerticalStack class="w-full">
      <HorizontalStack class="justify-between items-center">
        <p class="font-medium">
          TEAM #{{ teamNumber }}
        </p>
        <p class="text-neutral-400 font-medium leading-0 text-sm">
          {{ nickname }}
        </p>
      </HorizontalStack>
      <DescriptorContainer class="mb-auto">
        <Descriptor label="Table" :value="String(table)"/>
        <Descriptor label="Section" :value="String(section)"/>
        <Descriptor label="Mentor" :value="mentor"/>
      </DescriptorContainer>
      <p class="font-medium @[0px]/team-item:hidden @[220px]/team-item:line-clamp-1 @[300px]/team-item:line-clamp-3 @[500px]/team-item:line-clamp-3">
        {{ studentNames }}
      </p>
      <HorizontalStack class="flex-row-reverse">
        <IconButton @click="navigateEditTeamView()">
          <template #icon>
            <PencilIcon/>
          </template>
        </IconButton>
      </HorizontalStack>
    </VerticalStack>
  </GridItem>
</template>

<style scoped>

</style>
