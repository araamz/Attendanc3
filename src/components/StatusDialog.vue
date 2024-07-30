<template>
  <Dialog :title="title" :dialog-open="model" @close="emit('close')" :action-button-label="actionButtonLabel" :action-button-handler="actionButtonHandler">
    <template #icon>
      <slot name="icon" />
    </template>
    <VerticalStack>
      <HorizontalStack spacing="sm" v-if="type === 'successful'" class="text-green-600">
        <span class="[&>*]:size-6">
          <CheckCircleIcon />
        </span>
        <p class="text-lg font-semibold leading-none">
          Success!
        </p>
      </HorizontalStack>
      <HorizontalStack spacing="sm" v-if="type === 'error'" class="text-red-600">
        <span class="[&>*]:size-6">
          <ExclamationTriangleIcon />
        </span>
        <p class="text-lg font-semibold leading-none">
          Error!
        </p>
      </HorizontalStack>
      <HorizontalStack spacing="sm" v-if="type === 'confirmation'" class="text-yellow-600">
        <span class="[&>*]:size-6">
          <ExclamationCircleIcon />
        </span>
        <p class="text-lg font-semibold leading-none">
          Are you sure?
        </p>
      </HorizontalStack>
      <p class="font-medium" v-if="message !== undefined">
        {{message}}
      </p>
      <slot v-if="slots.default !== undefined" />
    </VerticalStack>
  </Dialog>
</template>

<script setup lang="ts">

import HorizontalStack from "./HorizontalStack.vue";
import Dialog, {IDialogEmits, IDialogProps} from "./Dialog.vue";
import {ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon} from "@heroicons/vue/20/solid";
import VerticalStack from "./VerticalStack.vue";
import { useSlots } from 'vue'

const slots = useSlots()

interface IStatusDialogProps extends IDialogProps {
  type: 'successful' | 'error' | 'confirmation';
  message?: string;
}
const {type, message, title, actionButtonLabel, actionButtonHandler} = defineProps<IStatusDialogProps>();

const model = defineModel<boolean>('dialogOpen', {
  default: true,
  required: true
})

const emit = defineEmits<IDialogEmits>();

</script>

<style scoped>

</style>