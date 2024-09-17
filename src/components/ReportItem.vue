<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import GridItem from "./GridItem.vue";
import Descriptor from "./Descriptor.vue";
import IconButton from "./IconButton.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import {ClipboardDocumentListIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import Checkbox from "./Checkbox.vue";
import {useRouter} from "vue-router";
import {IStudentRecord, ITeamRecord} from "../types.ts";
import {computed} from "vue";

interface IReportItemEmits {
  (event: 'show', data: ITeamRecord): void;
  (event: 'remove', data: ITeamRecord): void;
}
const emit = defineEmits<IReportItemEmits>()

interface IReportItemProps {
  teamRecord: ITeamRecord;
}
const {teamRecord} = defineProps<IReportItemProps>();

const router = useRouter();

const creationDateTime = computed(() => {
  const datetime = new Date(teamRecord.timestamp);

  return {
    date: datetime.toLocaleDateString(),
    time: datetime.toLocaleTimeString(),
  }
})

const updatedDateTime = computed(() => {
  const datetime = new Date(teamRecord.updatedTimestamp)

  return {
    date: datetime.toLocaleDateString(),
    time: datetime.toLocaleTimeString()
  }
})


</script>

<template>
  <GridItem class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-center gap-2">
      <p class="font-medium">
        TEAM #{{ teamRecord.team.teamNumber }}
      </p>
    </div>
    <DescriptorContainer>
      <Descriptor label="rubric" :value="String(teamRecord.studentRecords[0].rubricGroup.label)" />
      <Descriptor label="section" :value="String(teamRecord.team.section)" />
      <Descriptor v-if="!teamRecord.updatedTimestamp" label="time created" :value="creationDateTime.time" />
      <Descriptor v-if="teamRecord.updatedTimestamp" label="time updated" :value="updatedDateTime.time" />
    </DescriptorContainer>
    <div class="flex flex-row justify-between items-center mt-auto">
      <IconButton :onclick="() => emit('remove', teamRecord)">
        <template #icon>
          <XMarkIcon />
        </template>
      </IconButton>
      <IconButton :onclick="() => emit('show', teamRecord)">
        <template #icon>
          <ClipboardDocumentListIcon />
        </template>
      </IconButton>
    </div>
  </GridItem>
</template>