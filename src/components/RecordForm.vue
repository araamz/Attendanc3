<template>
  <VerticalStack>
    <Section title="Billable Hours">
      <template #icon>
        <ClockIcon/>
      </template>
      <PaperContainer>
        <VerticalStack>
        <Rubric/>
        <InputContainer label="Additional Comment">
          <textarea rows="5"/>
        </InputContainer>
        <div class="overflow-auto flex flex-col gap-1.5">
          <p class="text-xs font-semibold text-neutral-400 uppercase leading-none">
            Deductions
          </p>
          <HorizontalStack class="flex flex-row flex-wrap">
            <button class="flex flex-row items-center  gap-0.5 px-2 py-1.5 rounded-md bg-neutral-100 text-neutral-400">
              <PlusIcon class="size-5" />
              <p class="font-medium leading-none">
                Absent.
              </p>
            </button>
            <button class="flex flex-row items-center  gap-0.5 px-2 py-1.5 rounded-md bg-neutral-100 text-neutral-400">
              <PlusIcon class="size-5" />
                          <p class="font-medium leading-none">
              Late 5 minutes.
            </p>
            </button>
            <button class="flex flex-row items-center  gap-0.5 px-2 py-1.5 rounded-md bg-neutral-100 text-neutral-400">
              <PlusIcon class="size-5" />
              <p class="font-medium leading-none">
                Late 10 minutes.
              </p>
            </button>
            <button class="flex flex-row items-center  gap-0.5 px-2 py-1.5 rounded-md bg-neutral-100 text-neutral-400">
              <PlusIcon class="size-5" />
              <p class="font-medium leading-none">
                Late 15 minutes.
              </p>
            </button>
            <button class="flex flex-row items-center  gap-0.5 px-2 py-1.5 rounded-md bg-neutral-100 text-neutral-400">
              <PlusIcon class="size-5" />
              <p class="font-medium leading-none">
                Late beyond 15 minutes.
              </p>
            </button>
          </HorizontalStack>
        </div>
        </VerticalStack>
      </PaperContainer>
    </Section>
  </VerticalStack>
</template>

<script setup lang="ts">

import Rubric from "./RubricSliceGroup.vue";
import InputContainer from "./InputContainer.vue";
import VerticalStack from "./VerticalStack.vue";
import Section from "./Section.vue";
import PaperContainer from "./PaperContainer.vue";
import {ClockIcon} from "@heroicons/vue/20/solid";
import HorizontalStack from "./HorizontalStack.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
</script>

<style scoped>

</style>