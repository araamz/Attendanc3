<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
  import GridItem from "./GridItem.vue";
  import Descriptor from "./Descriptor.vue";
  import IconButton from "./IconButton.vue";
  import DescriptorContainer from "./DescriptorContainer.vue";
  import {PencilIcon, PlusIcon} from "@heroicons/vue/16/solid";
  import Checkbox from "./Checkbox.vue";
  import {useRouter} from "vue-router";

  interface IRecordItemProps {
    recordId: string;
    teamNumber: number;
    teamNickname: string;
    table: string;
    section: string;
    leadMentor: string
    dateCreated: Date;
    timeCreated: Date;
  }
  const {recordId, teamNumber, teamNickname, table, section, leadMentor, dateCreated, timeCreated} = defineProps<IRecordItemProps>();

  const model = defineModel<boolean>("recordChecked", {
    default: false,
    required: true
  })

  const router = useRouter();
  const navigateRecordEditView = () => {
    router.push({
      name: "record_editor",
      params: {
        recordId: recordId
      }
    });
  }


</script>

<template>
  <GridItem class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-center">
      <p class="font-medium">
        TEAM #{{ teamNumber }}
      </p>
      <p class="text-neutral-400 font-medium leading-0">
        {{ teamNickname }}
      </p>
    </div>
    <DescriptorContainer>
      <Descriptor label="table" :value="table" />
      <Descriptor label="section" :value="section" />
      <Descriptor label="lead mentor" :value="leadMentor" />
      <Descriptor label="date created" value="12/15/2024" />
      <Descriptor label="time created" value="3:15 p.m." />
    </DescriptorContainer>
    <p class="mt-auto font-medium">
      Emily Johnson, Marcus Rodriguez, Amanda Smith, Benjamin Lee, Sophia Martinez
    </p>
    <div class="flex flex-row justify-between items-center">
      <Checkbox v-model="model" :unique-identifier="recordId">
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