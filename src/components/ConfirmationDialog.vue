<template>
  <Dialog :title="title" :dialog-open="model" @close="emit('close')" :action-button-label="actionButtonLabel" :action-button-handler="actionButtonHandler">
    <template #icon>
      <slot name="icon" />
    </template>
    <VerticalStack>
      <HorizontalStack spacing="sm" class="text-yellow-600">
        <span class="[&>*]:size-6">
          <ExclamationCircleIcon />
        </span>
        <p class="text-lg font-semibold leading-none">
          Are you sure?
        </p>
      </HorizontalStack>
      <p class="font-medium">
        {{message}}
      </p>
    </VerticalStack>
  </Dialog>
</template>

<script setup lang="ts">

import HorizontalStack from "./HorizontalStack.vue";
import Dialog, {IDialogEmits, IDialogProps} from "./Dialog.vue";
import {ExclamationCircleIcon} from "@heroicons/vue/20/solid";
import VerticalStack from "./VerticalStack.vue";

export interface IConfirmationDialog extends IDialogProps {
  message: string;
}
const {message, title, actionButtonLabel, actionButtonHandler} = defineProps<IConfirmationDialog>();

const model = defineModel<boolean>('dialogOpen', {
  default: true,
  required: true
})

const emit = defineEmits<IDialogEmits>();

</script>

<style scoped>

</style>