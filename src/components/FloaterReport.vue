<template>
  <Dialog @close="handleFloaterReportDialogClose" :open="floaterReportDialogModel" class="flex absolute bg-white w-svw h-svh z-50 inset-0">
    <DialogPanel v-if="teamRecordModel" class="flex flex-col grow md:mx-auto md:max-w-[600px]">
      <div class="flex flex-row justify-between items-center p-3">
        <div>
          <p class="font-semibold">
            TEAM #{{teamRecordModel.team.teamNumber}}
          </p>
          <p class="text-sm font-medium text-neutral-400">
            {{teamRecordModel.studentRecords[0].rubricGroup.label}}
          </p>
        </div>
        <div>
        <IconButton :onclick="handleFloaterReportDialogClose">
          <template #icon>
            <XMarkIcon />
          </template>
        </IconButton>
        </div>
      </div>
      <div class="flex flex-col">
        <div v-for="record in teamRecordModel.studentRecords" class="odd:bg-neutral-100 odd:rounded-md px-5 py-3">
          <div class="flex flex-row justify-between items-center leading-none pb-2">
            <p class="font-medium">
              {{record.student.firstName}} {{record.student.lastName}}
            </p>
            <Tag :label="record.student.preferredPronouns" />
          </div>
          <div class="flex flex-col">
            <div v-for="rubricGrade in record.grades" class="border-b-2 border-neutral-200 py-2 first:pt-0 last:pb-0 last:border-b-0">
              <div class="flex flex-row justify-between items-center text-sm leading-none">
                <p class="font-medium text-slate-600">
                  {{rubricGrade.rubric.label}}
                </p>
                <div class="px-1 py-0.5 bg-slate-600 text-white rounded-md text-xs font-medium">
                  <p>
                    {{rubricGrade.earnedSlice.label}} <span>({{rubricGrade.earnedSlice.score}} pts.)</span>
                  </p>
                </div>
              </div>
              <p class="text-sm text-neutral-400 font-medium italic">
                {{rubricGrade.comment}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script setup lang="ts">

import {Dialog, DialogPanel} from "@headlessui/vue";
import {ITeamRecord} from "../types.ts";
import IconButton from "./IconButton.vue";
import {XMarkIcon} from "@heroicons/vue/16/solid";
import Tag from "./Tag.vue";

const handleFloaterReportDialogClose = () => {
  floaterReportDialogModel.value = false;
  teamRecordModel.value = null;
}

const teamRecordModel = defineModel<ITeamRecord | null>('teamRecord')
const floaterReportDialogModel = defineModel<boolean>('floaterReportDialogOpen')
</script>

<style scoped>

</style>