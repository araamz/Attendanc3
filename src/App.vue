<script setup lang="ts">
  import PrimaryNavigation from "./components/PrimaryNavigation.vue";
  import PrimaryNavigationButton from "./components/PrimaryNavigationLink.vue";
  import { ListBulletIcon, PlusIcon, UserGroupIcon, DocumentCheckIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/solid";
  import {IRubric} from "./types.ts";

  // Add State for Report Selections - use Dependency Injection to provide functionality between RecordsListView and ReportView
  // Make Rubrics Available = use Dependency Injection to provide functionality NewRecordView
  // Make Pronouns Available = use Dependency Injection to provide functionality NewTeamView

  const billableHoursRubric: IRubric = {
    label: "Billable Hours",
    commonDeductions: [
      "Absent.",
      "Late first 5 minutes.",
      "Late first 10 minutes.",
      "Late first 15 minutes."
    ],
    slices: [
      {
        id: "70c41ff1-b234-48bd-b9d9-52629c8bf373",
        score: 0,
        label: "No Marks",
        description: "Did not attend lab or multiple reasons why billable hours should not be awarded."
      },
      {
        id: "c0852a50-cc22-4d81-a3fc-be002298a661",
        score: 5,
        label: "Partial Marks",
        description: "Student is NOT on time and ready to participate at start of class."
      },
      {
        id: "92478a18-db74-4fae-aab7-0e32e4277cfb",
        score: 10,
        label: "Full Marks",
        description: "Student is on time and ready to participate at start of class."
      }
    ]
  }
  const labPreparationRubric: IRubric = {
    label: "Lab Preparation",
    commonDeductions: [
        "Absent.",
        "Incomplete notes on Page ...",
        "Missing notes on Page ...",
    ],
    slices: [
      {
        id: "c18335d0-5d56-4268-bfa3-dc1c209fca3a",
        score: 0,
        label: "No Marks",
        description: "Missing CSE Lecture 1 notes."
      },
      {
        id: "be4c59e6-fc0c-46b0-866e-c0574d3d2ccd",
        score: 2.5,
        label: "Partial Marks",
        description: "Some CSE Lecture 1 notes are filled in, but not all sections are complete."
      },
      {
        id: "6cb45610-7331-4507-9bdb-fcd14400e84f",
        score: 5,
        label: "Full Marks",
        description: "Lecture notes from CSE Lecture 1 are complete."
      }
    ]
  }
  const consolidatedRubrics: Array<IRubric> = [billableHoursRubric, labPreparationRubric]


</script>

<template>
  <div class="h-svh flex flex-col bg-neutral-200 overflow-y-auto md:flex-row-reverse">
      <router-view class="grow overflow-y-auto" />
    <PrimaryNavigation>
      <PrimaryNavigationButton label="Grade" :to="{name: 'grade'}">
        <template #icon>
          <PlusIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Records" :to="{name: 'record_list'}">
        <template #icon>
          <ListBulletIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Report" :to="{name: 'generate_report'}">
        <template #icon>
          <DocumentCheckIcon/>
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Teams" :to="{name: 'team_list'}">
        <template #icon>
          <UserGroupIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Help" :to="{name: 'help'}">
        <template #icon>
          <QuestionMarkCircleIcon />
        </template>
      </PrimaryNavigationButton>
    </PrimaryNavigation>
  </div>
</template>

<style scoped>

</style>
