<script setup lang="ts">
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import PrimaryNavigationButton from "./components/PrimaryNavigationLink.vue";
import { ListBulletIcon, PlusIcon, UserGroupIcon, DocumentCheckIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="h-svh flex flex-col bg-neutral-200 overflow-y-auto">
    <div class="grow overflow-y-auto">
      <router-view />
    </div>
    <PrimaryNavigation>
      <PrimaryNavigationButton label="New Record" :to="{path: '/new_record'}">
        <template #icon>
          <PlusIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Records" :to="{name: 'record_list'}">
        <template #icon>
          <ListBulletIcon />
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Report" :to="{path: '/new_record'}">
        <template #icon>
          <DocumentCheckIcon/>
        </template>
      </PrimaryNavigationButton>
      <PrimaryNavigationButton label="Teams" :to="{name: 'team_list'}">
        <template #icon>
          <UserGroupIcon />
        </template>
      </PrimaryNavigationButton>
    </PrimaryNavigation>
  </div>
</template>

<style scoped>

</style>
