<script setup lang="ts">
import {PencilIcon} from "@heroicons/vue/16/solid";
import GridItem from "./GridItem.vue";
import Descriptor from "./Descriptor.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import IconButton from "./IconButton.vue";

interface ITeamItemProps {
  teamNumber: string;
}

const {teamNumber} = defineProps<ITeamItemProps>()

const editAction = () => {
  console.log("editAction");
}

const deleteAction = () => {
  console.log("deleteAction");
}

</script>

<template>
  <GridItem class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-center">
      <p class="font-medium">
        TEAM #243
      </p>
      <p class="text-neutral-400 font-medium leading-0">
        Toxic ☢️
      </p>
    </div>
    <DescriptorContainer>
      <Descriptor label="table" value="6" />
      <Descriptor label="section" value="1204" />
      <Descriptor label="mentor" value="John Doe" />
    </DescriptorContainer>
      <p class="mt-auto font-medium">
        Emily Johnson, Marcus Rodriguez, Amanda Smith, Benjamin Lee, Sophia Martinez
      </p>
    <div class="flex flex-row-reverse">
      <IconButton :onclick="editAction" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full">
        <template #icon>
          <PencilIcon />
        </template>
      </IconButton>
    </div>
  </GridItem>
</template>

<style scoped>

</style>
