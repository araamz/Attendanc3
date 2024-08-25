<script setup lang="ts">
  import PrimaryNavigation from "./components/PrimaryNavigation.vue";
  import PrimaryNavigationButton from "./components/PrimaryNavigationLink.vue";
  import { ListBulletIcon, PlusIcon, UserGroupIcon, DocumentCheckIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/solid";
  import {IRubricGroup} from "./types.ts";
  import {provide} from "vue";

  // Add State for Report Selections - use Dependency Injection to provide functionality between RecordsListView and ReportView
  // Make Rubrics Available = use Dependency Injection to provide functionality NewRecordView
  // Make Pronouns Available = use Dependency Injection to provide functionality NewTeamView

  const rubricGroups: Array<IRubricGroup> = [
    {
      id: '7948d1f6-ecf5-4d3f-9ac2-c19641dfd02f',
      label: 'CSE Lab 1',
      rubrics: [
        {
          id: '6cf5514f-5e5a-4a17-841d-b0af216ea5ff',
          label: 'Billable Hours',
          commonDeductions: [
              'Late 5 minutes.',
              'Late 10 minutes.',
              'Late 15 minutes.',
              'Late more than 15 minutes.'
          ],
          slices: [
            {
              id: '39c86758-1cd6-4794-899c-015f6cf46995',
              score: 10,
              label: 'Full Marks',
              description: 'Student is on time and ready to participate at start of class.'
            },
            {
              id: '445a0332-2a75-4dbd-b4e5-2355c65afd8d',
              score: 5,
              label: 'Partial Marks',
              description: 'Student is NOT on time and ready to participate at start of class.'
            },
            {
              id: '54408cbf-0942-42c5-a92d-2c9e94716d57',
              score: 0,
              label: 'No Marks',
              description: 'Did not attend lab or multiple reasons why billable hours should not be awarded.'
            }
          ]
        },
        {
          id: 'e2a8b581-a195-4459-8646-d5ad9fb521d6',
          label: 'Lab Preparation',
          commonDeductions: [
              'Notes missing on Page 34.',
              'Notes partially missing on Page 34.',
              'Did not bring notebook to class.'
          ],
          slices: [
            {
              id: '0cf2be43-1b93-4064-ae55-c20b36909d77',
              score: 5,
              label: 'Full Marks',
              description: 'Lecture notes from CSE Lecture 1 are complete.'
            },
            {
              id: '24cc1f87-09ac-4422-8973-d536a73e699d',
              score: 2.5,
              label: 'Partial Marks',
              description: 'Some CSE Lecture 1 notes are filled in, but not all sections are complete.',
            },
            {
              id: 'fc22142a-bfc1-4cdb-b374-dc892e3574de',
              score: 0,
              label: 'No Marks',
              description: 'Missing CSE Lecture 1 notes.'
            }
          ]
        }
      ]
    }
  ]

  provide('rubricGroups', rubricGroups)


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
      <PrimaryNavigationButton label="Records" :to="{name: 'records_list'}">
        <template #icon>
          <ListBulletIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Report" :to="{name: 'generate_report'}">
        <template #icon>
          <DocumentCheckIcon/>
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Teams" :to="{name: 'teams_list'}">
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
