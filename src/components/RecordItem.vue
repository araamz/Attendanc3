<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
  import GridItem from "./GridItem.vue";
  import Descriptor from "./Descriptor.vue";
  import IconButton from "./IconButton.vue";
  import DescriptorContainer from "./DescriptorContainer.vue";
  import {PencilIcon, PlusIcon} from "@heroicons/vue/16/solid";
  import Checkbox from "./Checkbox.vue";
  import {useRouter} from "vue-router";
  import {ITeamRecord} from "../types.ts";
  import {computed} from "vue";

  interface IRecordItemProps {
    teamRecord: ITeamRecord;
  }
  const {teamRecord} = defineProps<IRecordItemProps>();

  const selectedRecordReportsModel = defineModel<Array<ITeamRecord>>("selectedRecordReports", {
    default: false,
    required: true
  })

  const router = useRouter();
  const navigateRecordEditView = () => {
    router.push({
      name: "record_editor",
      params: {
        recordId: teamRecord.id
      }
    });
  }

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

  const isSelected = computed({
    get() {
      return selectedRecordReportsModel.value.some((record: ITeamRecord) => record.id === teamRecord.id);
    },
    set(value) {
      if (value) {
        selectedRecordReportsModel.value = [...selectedRecordReportsModel.value, teamRecord];
      } else {
        console.log(value);
        selectedRecordReportsModel.value = selectedRecordReportsModel.value.filter((record: ITeamRecord) => record.id !== teamRecord.id)
      }
    }
  })


</script>

<template>
  <GridItem class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-center gap-2">
      <p class="font-medium">
        TEAM #{{ teamRecord.team.teamNumber }}
      </p>
      <p v-if="teamRecord.team.nickname" class="text-neutral-400 font-medium leading-0 text-right text-sm">
        {{ teamRecord.team.nickname }}
      </p>
    </div>
    <DescriptorContainer>
      <Descriptor label="rubric" :value="String(teamRecord.studentRecords[0].rubricGroup.label)" />
      <Descriptor label="section" :value="String(teamRecord.team.section)" />
      <Descriptor v-if="!teamRecord.updatedTimestamp" label="time created" :value="creationDateTime.time" />
      <Descriptor v-if="teamRecord.updatedTimestamp" label="time updated" :value="updatedDateTime.time" />
    </DescriptorContainer>
    <div class="flex flex-row justify-between items-center mt-auto">
      <Checkbox v-model="isSelected" :unique-identifier="teamRecord.id">
        <template #icon>
          <PlusIcon />
        </template>
      </Checkbox>
      <IconButton :onclick="() => navigateRecordEditView()" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full">
        <template #icon>
          <PencilIcon />
        </template>
      </IconButton>
    </div>
  </GridItem>
</template>