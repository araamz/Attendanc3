<script setup lang="ts">
import Button from "./Button.vue";
import {PencilIcon} from "@heroicons/vue/16/solid";
import GridItem from "./GridItem.vue";

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
      <p class=" font-medium">
        TEAM #243
      </p>
      <p class="text-neutral-400 leading-0">
        🏁🎬
      </p>
    </div>
    <div class="flex flex-col gap-1 [&>*]:border-b-2 [&>*]:border-neutral-200">
      <div class="flex flex-row justify-between items-center py-0.5">
        <p class='text-xs font-medium text-neutral-400'>
          TABLE
        </p>
        <p class='text-sm font-semibold'>
          4
        </p>
      </div>
      <div class="flex flex-row justify-between items-center py-0.5">
        <p class='text-xs font-medium text-neutral-400'>
          SECTION
        </p>
        <p class='text-sm font-semibold'>
          1204
        </p>
      </div>
      <div class="flex flex-row justify-between items-center py-0.5">
        <p class='text-xs font-medium text-neutral-400 font-medium'>
          LEAD MENTOR
        </p>
        <p class='text-sm font-semibold'>
          John Doe
        </p>
      </div>
    </div>
      <p class="mt-auto font-medium">
        Emily Johnson, Marcus Rodriguez, Amanda Smith, Benjamin Lee, Sophia Martinez
      </p>
    <div class="flex flex-row-reverse">
      <button onclick="" label="" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full">
        <PencilIcon class="size-4" />
      </button>
    </div>
  </GridItem>
</template>

<style scoped>

</style>
