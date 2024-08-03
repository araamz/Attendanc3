<script setup lang="ts">

  import GridContainer from "../../components/GridContainer.vue";
  import TeamItem from "../../components/TeamItem.vue";
  import {useRouter} from "vue-router";
  import {PlusIcon} from "@heroicons/vue/16/solid";
  import {useDatabase} from "../../composables/useDatabase.ts";
  import GridButton from "../../components/GridButton.vue";
  import {onBeforeMount, ref} from "vue";
  import {ITeam} from "../../types.ts";

  const router = useRouter();
  const navigateNewTeamView = () => {
    router.push({
      name: "new_team",
    });
  }

  const teams = ref<Array<ITeam>>([])
  const {getAllTeams} = useDatabase();
  onBeforeMount(() => {
    getAllTeams().then((data) => {
      return data.forEach((item) => {
        teams.value.push(item)
      })
    });
  })

</script>

<template>
    <GridContainer>
      <TeamItem v-for="team in teams"
                :key="team.teamNumber"
                :team-number="team.teamNumber"
                :nickname="team.nickname"
                :table="team.table"
                :section="team.section"
                :mentor="team.mentor"
                :assigned-students="team.assignedStudents" />
      <GridButton :onclick="navigateNewTeamView" label="New Team">
        <template #icon>
          <PlusIcon />
        </template>
      </GridButton>
    </GridContainer>
</template>

<style scoped>

</style>
