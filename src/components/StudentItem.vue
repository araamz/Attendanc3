<template>
  <GridItem class="flex @container/student-item">
    <VerticalStack class="w-full">
      <HorizontalStack class="justify-between items-center">
        <p class="font-medium">
          {{ firstName }} {{ lastName }}
        </p>
        <p class="text-neutral-400 font-medium leading-0 text-sm">
          {{ preferredName }}
        </p>
      </HorizontalStack>
      <DescriptorContainer class="mb-auto">
        <Descriptor label="First Name" :value="firstName"/>
        <Descriptor label="Last Name" :value="lastName"/>
        <Descriptor label="Preferred Pronouns" :value="preferredPronouns"/>
      </DescriptorContainer>
      <div class="line-clamp-1 @xs/student-item:line-clamp-3 @lg/student-item:line-clamp-5 bg-amber-100">
        <p class="font-medium">
          {{ notes }}
        </p>
      </div>
      <HorizontalStack class="justify-between">
        <IconButton @click="editButtonHandler()">
          <template #icon>
            <PencilIcon/>
          </template>
        </IconButton>
        <IconButton @click="deleteButtonHandler()">
          <template #icon>
            <TrashIcon/>
          </template>
        </IconButton>
      </HorizontalStack>
    </VerticalStack>
  </GridItem>
</template>

<script setup lang="ts">

interface IStudentItemProps extends IStudent {
  editButtonHandler: Function;
  deleteButtonHandler: Function;
}

import {IStudent} from "../types.ts";
import GridItem from "./GridItem.vue";
import VerticalStack from "./VerticalStack.vue";
import HorizontalStack from "./HorizontalStack.vue";
import Descriptor from "./Descriptor.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import IconButton from "./IconButton.vue";
import {PencilIcon, TrashIcon} from "@heroicons/vue/16/solid";

const {
  firstName,
  lastName,
  preferredName,
  preferredPronouns,
  notes,
  editButtonHandler,
  deleteButtonHandler
} = defineProps<IStudentItemProps>()
</script>

<style scoped>

</style>