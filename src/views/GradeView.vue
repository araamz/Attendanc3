<script setup lang="ts">

import {computed, onBeforeMount, watch} from "vue";
import ViewShell from "../components/ViewShell.vue";
import {useDatabase} from "../composables/useDatabase.ts";
import {inject, ref, Ref} from "vue";
import {IStatusDialogProps} from "../components/StatusDialog.vue";
import {IRubric, IRubricGrade, IRubricGroup, IStudent, IStudentRecord, ITeam} from "../types.ts";
import {useRouter} from "vue-router";
import TeamSelector from "../components/TeamSelector.vue";
import RubricGroupSelector from "../components/RubricGroupSelector.vue";
import PaperContainer from "../components/PaperContainer.vue";
import VerticalStack from "../components/VerticalStack.vue";
import Section from "../components/Section.vue";
import InputContainer from "../components/InputContainer.vue";
import {PlusIcon} from "@heroicons/vue/16/solid";
import {InformationCircleIcon} from "@heroicons/vue/20/solid";
import Button from "../components/Button.vue";
import IconButton from "../components/IconButton.vue";
import ScrollButton from "../components/ScrollButton.vue";

const router = useRouter()
const {getAllTeams, getSingleTeam} = useDatabase();
const rubricGroupSelections = inject("rubricGroupSelections");

const teamSelections = ref<Array<ITeam>>([]);

interface IGradeViewState {
  currentTeamSelection: Ref<ITeam | null>;
  currentRubricGroupSelection: Ref<IRubricGroup | null>;
  statusDialogState: Ref<IStatusDialogProps | null>;
  statusDialogOpen: Ref<boolean>;
  studentRecords: Ref<Array<IStudentRecord>>;
}

const state: IGradeViewState = {
  currentTeamSelection: ref<ITeam | null>(null),
  currentRubricGroupSelection: ref<IRubricGroup | null>(null),
  statusDialogState: ref<IStatusDialogProps | null>(null),
  statusDialogOpen: ref<boolean>(false),
  studentRecords: ref<Array<IStudentRecord>>([])
}

const rubricReady = computed(() => {
  return state.studentRecords.value.length > 0
})

watch([state.currentTeamSelection, state.currentRubricGroupSelection], ([newTeamSelection, newRubricGroupSelection]): void => {
  if (newTeamSelection === null || newRubricGroupSelection === null) return;
  state.studentRecords.value = newTeamSelection.assignedStudents.map((student: IStudent): IStudentRecord => ({
    student: student,
    rubricGroup: newRubricGroupSelection,
    grades: newRubricGroupSelection.rubrics.map((rubric: IRubric): IRubricGrade => ({
      rubric: rubric,
      earnedSlice: undefined,
      comment: ''
    }))
  }))
})

watch(state.studentRecords, () => {
  console.log(state.studentRecords.value)
})

const setTeamSelection = (teamNumber: number) => {
  getSingleTeam(teamNumber).then((team) => {
    state.currentTeamSelection.value = team;
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: String(teamNumber)
      }
    })
  }).catch((error) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        teamNumber: undefined
      }
    })
  })
}

const setRubricGroupSelection = (rubricGroupId: string) => {
  if (rubricGroupSelections.some((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)) {
    const rubricGroupSelection = rubricGroupSelections.find((rubricGroup: IRubricGroup) => rubricGroup.id === rubricGroupId)
    state.currentRubricGroupSelection.value = rubricGroupSelection;
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: rubricGroupId
      }
    })
  } else {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        rubricGroupId: undefined
      }
    })
  }
}

const handleTeamSelection = (team: ITeam) => {
  setTeamSelection(team.teamNumber)
}

const handleRubricGroupSelection = (rubricGroup: IRubricGroup) => {
  setRubricGroupSelection(rubricGroup.id)
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    teamSelections.value = teams;
  })

  if (router.currentRoute.value.query.teamNumber) setTeamSelection(Number(router.currentRoute.value.query.teamNumber))
  if (router.currentRoute.value.query.rubricGroupId) setRubricGroupSelection(router.currentRoute.value.query.rubricGroupId)
})

</script>
<template>
  <ViewShell class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <TeamSelector @update:team-selection="handleTeamSelection"
                    v-model:team-selection="state.currentTeamSelection.value" :team-selections="teamSelections"/>
      <RubricGroupSelector @update:rubric-group-selection="handleRubricGroupSelection"
                           v-model:rubric-group-selection="state.currentRubricGroupSelection.value"
                           :rubric-group-selections="rubricGroupSelections"/>
    </div>
    <VerticalStack spacing="lg" v-if="rubricReady">
      <PaperContainer class="flex flex-col gap-4" v-for="studentRecord in state.studentRecords.value"
                      :key="studentRecord.student.id">
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row gap-2 items-center">
            <p class="font-medium leading-none">
              {{ `${studentRecord.student.firstName} ${studentRecord.student.lastName}` }}
            </p>
            <div class="bg-slate-200 px-2 py-1 rounded-md">
              <p class="text-xs font-medium leading-none text-slate-400">
                {{ studentRecord.student.preferredPronouns }}
              </p>
            </div>
          </div>
          <IconButton>
            <template #icon>
              <InformationCircleIcon />
            </template>
          </IconButton>
        </div>
        <div class="flex flex-col gap-4">
          <Section v-for="rubricGrade in studentRecord.grades" :key="rubricGrade.rubric.id"
                   :title="rubricGrade.rubric.label">
            <div class="flex flex-col gap-2">
              <InputContainer label="Rubric Slices">
                <div class="flex flex-col md:grid md:grid-cols-3 gap-2">
                  <label class="bg-neutral-100 p-2 rounded-md" v-for="slice in rubricGrade.rubric.slices">
                    <div class="font-medium leading-snug">
                      <p>
                        {{ slice.score }} pts.
                      </p>
                      <p>
                        {{ slice.label }}
                      </p>
                    </div>
                    <p class="text-sm">
                      {{ slice.description }}
                    </p>
                  </label>
                </div>
              </InputContainer>
              <InputContainer label="Comment">
                <textarea rows="3"/>
              </InputContainer>
              <InputContainer label="Common Deductions">
                <div class="flex flex-wrap gap-2">
                <button
                    class="has-[:checked]:bg-slate-600 has-[:checked]:text-white bg-neutral-100 text-neutral-400 inline-flex items-center gap-1 py-1 px-2.5 rounded-md font-medium w-fit"
                    v-for="commonDeduction in rubricGrade.rubric.commonDeductions">
                    <span>
                      <PlusIcon class="size-4 leading-none"/>
                    </span>
                  {{ commonDeduction }}
                </button>
                </div>
              </InputContainer>
            </div>
          </Section>
        </div>
      </PaperContainer>
    </VerticalStack>
    <ScrollButton v-if="rubricReady" :onclick="() => console.log('clicked')" label="Create Record">
      <template #icon>
        <PlusIcon />
      </template>
    </ScrollButton>
  </ViewShell>
</template>

<style scoped>

</style>
