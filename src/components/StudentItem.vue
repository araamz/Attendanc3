<template>
  <GridItem>
    <VerticalStack class="h-full">
      <HorizontalStack class="justify-between items-center">
        <p class="font-medium">
          {{firstName}} {{lastName}}
        </p>
        <p class="text-neutral-400 font-medium leading-0">
          {{preferredName}}
        </p>
      </HorizontalStack>
      <DescriptorContainer>
        <Descriptor label="First Name" :value="firstName" />
        <Descriptor label="Last Name" :value="lastName" />
        <Descriptor label="Preferred Pronouns" :value="preferredPronouns" />
      </DescriptorContainer>
      <p class="mt-auto font-medium line-clamp-3">
        {{notes}}
      </p>
      <HorizontalStack class="justify-between">
        <IconButton :onclick="() => toggleStudentEditorForm(true)">
          <template #icon>
            <PencilIcon />
          </template>
        </IconButton>
        <IconButton>
          <template #icon>
            <TrashIcon />
          </template>
        </IconButton>
      </HorizontalStack>
    </VerticalStack>
  </GridItem>
  <Dialog title="Modify Student" v-model:dialog-open="studentEditorFormOpen" @close="() => toggleStudentEditorForm(false)">
    <template #icon>
      <UserPlusIcon />
    </template>
    <VerticalStack spacing="lg">

    </VerticalStack>
  </Dialog>
</template>

<script setup lang="ts">

  import {IStudent} from "../types.ts";
  import GridItem from "./GridItem.vue";
  import VerticalStack from "./VerticalStack.vue";
  import HorizontalStack from "./HorizontalStack.vue";
  import Descriptor from "./Descriptor.vue";
  import DescriptorContainer from "./DescriptorContainer.vue";
  import Dialog from "./Dialog.vue";
  import {ref} from "vue";
  import {UserPlusIcon} from "@heroicons/vue/20/solid";
  import IconButton from "./IconButton.vue";
  import {PencilIcon, TrashIcon} from "@heroicons/vue/16/solid";

  const studentEditorFormOpen = ref<boolean>(false);
  const toggleStudentEditorForm = (state: boolean): void => {
    studentEditorFormOpen.value = state;
  }

  const {firstName, lastName, preferredName, preferredPronouns, notes} = defineProps<IStudent>()

</script>

<style scoped>

</style>