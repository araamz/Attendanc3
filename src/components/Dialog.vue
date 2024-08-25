<template>
  <Dialog :open="model" @close="emit('close')"
          class="flex place-content-center absolute top-0 left-0 w-full h-svh backdrop-blur bg-black/50 ">
    <DialogPanel class="flex flex-col w-full max-h-full md:max-w-[350px] lg:max-w-[500px]">
      <VerticalStack class="p-10 overflow-y-auto">
        <HorizontalStack v-if="title !== undefined" class="text-white">
            <span class="[&>*]:size-4">
              <slot name="icon"/>
            </span>
          <p class="font-medium text-sm">
            {{ title }}
          </p>
        </HorizontalStack>
        <PaperContainer class="flex flex-col gap-4 overflow-y-auto">
          <div class="box-border overflow-y-auto">
            <slot/>
          </div>
          <HorizontalStack class="border-t-2 border-neutral-100 pt-4 flex-row-reverse">
            <Button highlighted v-if="actionButtonHandler !== undefined" @click="actionButtonHandler()" :disableOption="actionButtonHandlerDisabled">
              {{ actionButtonLabel }}
            </Button>
            <Button @click="handleClose()">
              Close
            </Button>
          </HorizontalStack>
        </PaperContainer>
      </VerticalStack>
    </DialogPanel>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel
} from '@headlessui/vue'
import PaperContainer from "./PaperContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import HorizontalStack from "./HorizontalStack.vue";
import Button from "./Button.vue";

export interface IDialogEmits {
  (event: 'close', data: void): void
}

const emit = defineEmits<IDialogEmits>()

const model = defineModel<boolean>('dialogOpen', {
  default: true,
  required: true
})
const handleClose = () => {
  model.value = false;
  emit('close')
}

export interface IDialogProps {
  title?: string;
  actionButtonLabel?: string;
  actionButtonHandler?: Function;
  actionButtonHandlerDisabled?: boolean;
}

const {title, actionButtonLabel, actionButtonHandler, actionButtonHandlerDisabled} = defineProps<IDialogProps>()


</script>

<style scoped>

</style>