<script setup lang="ts">
import Button from "./Button.vue";
import { PencilIcon, XMarkIcon } from "@heroicons/vue/24/solid";

interface ITeamItemProps {
  teamNumber: number;
}
const { teamNumber } = defineProps<ITeamItemProps>()

const editAction = () => {
  console.log("editAction");
}

const deleteAction = () => {
  console.log("deleteAction");
}

</script>

<template>
  <div>
    <div>
    <p>
      TEAM #{{ teamNumber }}
    </p>
    <div>
      <Button :onclick="() => editAction()" label="EDIT">
        <template #icon>
          <PencilIcon />
        </template>
      </Button>
      <Button :onclick="() => deleteAction()" label="DELETE">
        <template #icon>
          <XMarkIcon />
        </template>
      </Button>
    </div>
    </div>
    <p class="hidden">

    </p>
  </div>
</template>

<style scoped>

</style>
