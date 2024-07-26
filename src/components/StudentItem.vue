<template>
  <GridItem class="flex @container/student-item">
    <VerticalStack class="w-full">
      <HorizontalStack class="justify-between items-center">
        <p class="font-medium">
          {{ firstName }} {{ lastName }}
        </p>
        <p class="text-neutral-400 font-medium leading-0">
          {{ preferredName }}
        </p>
      </HorizontalStack>
      <DescriptorContainer>
        <Descriptor label="First Name" :value="firstName"/>
        <Descriptor label="Last Name" :value="lastName"/>
        <Descriptor label="Preferred Pronouns" :value="preferredPronouns"/>
      </DescriptorContainer>
      <p class="font-medium mt-auto line-clamp-2 @xs/student-item:line-clamp-3 @sm/student-item:line-clamp-1">
        {{ notes }}
      </p>
      <HorizontalStack class="justify-between">
        <IconButton :onclick="() => toggleStudentEditorForm(true)">
          <template #icon>
            <PencilIcon/>
          </template>
        </IconButton>
        <IconButton>
          <template #icon>
            <TrashIcon/>
          </template>
        </IconButton>
      </HorizontalStack>
    </VerticalStack>
  </GridItem>
  <Dialog title="Modify Student" v-model:dialog-open="studentEditorFormOpen"
          @close="() => toggleStudentEditorForm(false)">
    <template #icon>
      <UserIcon/>
    </template>
    <VerticalStack spacing="lg">
      <StudentForm :form-id="formId" v-model:first-name="firstNameRef" v-model:last-name="lastNameRef"
                   v-model:preferred-name="preferredNameRef" v-model:preferred-pronouns="preferredPronounsRef" v-model:notes="notesRef" />
      <HorizontalStack>
        <button :onclick="() => submissionEditFunction(id, {
          id: id,
          firstName: firstNameRef,
          lastName: lastNameRef,
          preferredName: preferredNameRef,
          preferredPronouns: preferredPronounsRef,
          notes: notesRef
        })">
          Edit
        </button>
      </HorizontalStack>
    </VerticalStack>
  </Dialog>
</template>

<script setup lang="ts">

import { IStudent} from "../types.ts";
import GridItem from "./GridItem.vue";
import VerticalStack from "./VerticalStack.vue";
import HorizontalStack from "./HorizontalStack.vue";
import Descriptor from "./Descriptor.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import Dialog from "./Dialog.vue";
import {ref} from "vue";
import {UserIcon} from "@heroicons/vue/20/solid";
import IconButton from "./IconButton.vue";
import {PencilIcon, TrashIcon} from "@heroicons/vue/16/solid";
import StudentForm from "./StudentForm.vue";

const studentEditorFormOpen = ref<boolean>(false);
const toggleStudentEditorForm = (state: boolean): void => {
  studentEditorFormOpen.value = state;
}


interface IStudentItemProps extends IStudent {
  formId: string;
  submissionEditFunction: (id: string, newStudent: IStudent) => boolean;
}
const {formId, id, firstName, lastName, preferredName, preferredPronouns, notes} = defineProps<IStudentItemProps>()

const firstNameRef = ref<string>(firstName)
const lastNameRef = ref<string>(lastName)
const preferredPronounsRef = ref<string>(preferredPronouns)
const preferredNameRef = ref<string>(preferredName === null ? '' : preferredName)
const notesRef = ref<string>(notes === null ? '' : notes)

</script>

<style scoped>

</style>