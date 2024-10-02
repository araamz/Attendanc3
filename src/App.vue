<script setup lang="ts">
  import PrimaryNavigation from "./components/PrimaryNavigation.vue";
  import PrimaryNavigationButton from "./components/PrimaryNavigationLink.vue";
  import {ITeamRecord} from "./types.ts";
  import { ListBulletIcon, PlusIcon, UserGroupIcon, DocumentCheckIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/solid";
  import {IRubricGroup} from "./types.ts";
  import {onBeforeMount, provide, ref} from "vue";

  // Add State for Report Selections - use Dependency Injection to provide functionality between RecordsListView and ReportView
  // Make Rubrics Available = use Dependency Injection to provide functionality NewRecordView
  // Make Pronouns Available = use Dependency Injection to provide functionality NewTeamView

  const selectedRecordReports = ref<Array<ITeamRecord>>([]);

  const rubricGroupSelections: Array<IRubricGroup> = [
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
    },
    {
      id: '6528eedd-0931-438d-994b-5acc3021b1c7',
      label: 'CSE Lab 2',
      rubrics: [
        {
          id: 'be8503e9-c4a1-4558-af1b-1d88f8e6ef85',
          label: 'Billable Hours',
          commonDeductions: [
            'Absent.',
            'Late 5 minutes.',
            'Late 10 minutes.',
            'Late 15 minutes.',
            'Late more than 15 minutes.'
          ],
          slices: [
            {
              id: '9365003b-3ae3-43d5-8641-1c7d71f695d6',
              score: 10,
              label: 'Full Marks',
              description: 'Student is on time and ready to participate at start of class.'
            },
            {
              id: '46832f49-00c4-4a19-ab4f-25f746e7dd54',
              score: 5,
              label: 'Partial Marks',
              description: 'Student is NOT on time and ready to participate at start of class.'
            },
            {
              id: '89475d6f-582f-46e0-a37d-4c8ed7c10e01',
              score: 0,
              label: 'No Marks',
              description: 'Did not attend lab or multiple reasons why billable hours should not be awarded.'
            }
          ]
        },
        {
          id: '6faee760-6158-4916-934a-a6f5f776bf56',
          label: 'Lab Preparation',
          commonDeductions: [
            'Absent.',
            'Notes incomplete on Page 29.',
            'Notes incomplete on Page 30.',
            'Notes incomplete on Page 31.',
            'Did not bring notebook to class.'
          ],
          slices: [
            {
              id: 'ffa0857e-c0b1-4a01-94ed-bdccd96dfe0a',
              score: 5,
              label: 'Full Marks',
              description: 'Lecture notes from CSE Lecture 3 are complete.'
            },
            {
              id: '2c86eb6b-b10e-4d46-be06-9d3780d16549',
              score: 2.5,
              label: 'Partial Marks',
              description: 'Some CSE Lecture 3 notes are filled in, but not all sections are complete.',
            },
            {
              id: '66c64304-4495-444f-bb12-e2890ca8bceb',
              score: 0,
              label: 'No Marks',
              description: 'Missing CSE Lecture 3 notes.'
            }
          ]
        }
      ]
    },
    {
      id: 'ee8e5c66-3c38-4bac-a742-4c4967b237e6',
      label: 'ME Lab 1',
      rubrics: [
        {
          id: 'c46adee7-68cb-456d-8331-944dd9236ce8',
          label: 'Billable Hours',
          commonDeductions: [
            'Absent.',
            'Late 5 minutes.',
            'Late 10 minutes.',
            'Late 15 minutes.',
            'Late more than 15 minutes.',
            'Pseudocode on Page 36 is incomplete.',
            'Pseudocode on Page 36 is missing.'
          ],
          slices: [
            {
              id: '1848351c-530b-4b0e-b515-b85fecd3923f',
              score: 10,
              label: 'Full Marks',
              description: 'Student is on time and ready to participate at start of class; required pseudocode is complete and written on the last page of ME Lecture 1 study guide'
            },
            {
              id: '1b411199-3734-4efd-876d-55ff3ef58e7d',
              score: 5,
              label: 'Partial Marks',
              description: 'Student is NOT on time and ready to participate at start of class OR required pseudocode is incomplete or missing from the last page of the ME Lecture 1 study guide'
            },
            {
              id: '930a15f8-e6b3-4cbb-a994-461fb6022d8d',
              score: 0,
              label: 'No Marks',
              description: 'Student is NOT on time and ready to participate at start of class AND required pseudocode is incomplete or missing from the last page of the ME Lecture 1 study guide'
            }
          ]
        },
        {
          id: 'c1743375-959f-4070-abc0-e871bc8e988e',
          label: 'Lab Preparation',
          commonDeductions: [
            'Absent.',
            'Notes incomplete on Page 33.',
            'Notes incomplete on Page 34.',
            'Notes incomplete on Page 35.',
            'Did not bring notebook to class.'
          ],
          slices: [
            {
              id: 'd5137e4f-f05d-48ac-8492-0a32cfb7a7e7',
              score: 5,
              label: 'Full Marks',
              description: 'Lecture notes from ME Lecture 1 are complete.'
            },
            {
              id: 'ab515918-3de3-4d41-a24e-79816ba54ae9',
              score: 2.5,
              label: 'Partial Marks',
              description: 'Some ME Lecture 1 notes are filled in, but not all sections are complete.',
            },
            {
              id: '7a761021-0044-4970-98b6-9c2c08c4d3f0',
              score: 0,
              label: 'No Marks',
              description: 'Missing ME Lecture 1 notes.'
            }
          ]
        }
      ]
    },
    {
      id: 'ab9e950d-5a26-4199-a9fc-500ed87af348',
      label: 'ME Lab 2',
      rubrics: [
        {
          id: 'c46adee7-68cb-456d-8331-944dd9236ce8',
          label: 'Billable Hours',
          commonDeductions: [
            'Absent.',
            'Late 5 minutes.',
            'Late 10 minutes.',
            'Late 15 minutes.',
            'Late more than 15 minutes.',
          ],
          slices: [
            {
              id: '1848351c-530b-4b0e-b515-b85fecd3923f',
              score: 10,
              label: 'Full Marks',
              description: 'Student is on time and ready to participate at start of class.'
            },
            {
              id: '1b411199-3734-4efd-876d-55ff3ef58e7d',
              score: 5,
              label: 'Partial Marks',
              description: 'Student is NOT on time and ready to participate at start of class.'
            },
            {
              id: '930a15f8-e6b3-4cbb-a994-461fb6022d8d',
              score: 0,
              label: 'No Marks',
              description: 'Did not attend lab or multiple reasons why billable hours should not be awarded.'
            }
          ]
        },
        {
          id: 'c1743375-959f-4070-abc0-e871bc8e988e',
          label: 'Lab Preparation',
          commonDeductions: [
            'Absent.',
            'Notes incomplete on Page 38.',
            'Notes incomplete on Page 39.',
            'Notes incomplete on Page 40.',
            'Notes incomplete on Page 41.',
            'Did not bring notebook to class.'
          ],
          slices: [
            {
              id: 'd5137e4f-f05d-48ac-8492-0a32cfb7a7e7',
              score: 5,
              label: 'Full Marks',
              description: 'Lecture notes from ME Lecture 3 are complete.'
            },
            {
              id: 'ab515918-3de3-4d41-a24e-79816ba54ae9',
              score: 2.5,
              label: 'Partial Marks',
              description: 'Some ME Lecture 3 notes are filled in, but not all sections are complete.',
            },
            {
              id: '7a761021-0044-4970-98b6-9c2c08c4d3f0',
              score: 0,
              label: 'No Marks',
              description: 'Missing ME Lecture 3 notes.'
            }
          ]
        }
      ]
    }
  ]

  provide('rubricGroupSelections', rubricGroupSelections)
  provide('selectedRecordReports', selectedRecordReports)

  import { useRoute } from 'vue-router'
  import {useDatabase} from "./composables/useDatabase.ts";
  const route = useRoute()
  const {getAllRecords, deleteRecord} = useDatabase()

  onBeforeMount(() => {
    const expirationTime_ms = 48 * 60 * 60 * 1000;
    getAllRecords().then((records) => {
      records.forEach((record) => {
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - new Date(record.timestamp).getTime();
        if (timeDifference > expirationTime_ms) {
          deleteRecord(record.id)
          console.log("Deleted Record: ", record)
        }
      })
    })
  })
</script>

<template>
  <div class="h-svh flex flex-col bg-neutral-200 overflow-y-auto md:flex-row-reverse">
      <router-view :key="route.fullPath" class="grow overflow-y-auto" />
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
    </PrimaryNavigation>
  </div>
</template>

<style scoped>

</style>
