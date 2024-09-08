<template>
  <VerticalStack spacing="lg">
    <Section title="Team Selection">
      <template #icon>
        <UserGroupIcon />
      </template>
      <GridContainer>
        <TeamSelection v-for="team in state.teamSelections.value"
                       :key="team.id"
                       :team-number="team.teamNumber"
                       :nickname="team.nickname"
                       :table="team.table"
                       :section="team.section"
                       :mentor="team.mentor"
                       :assigned-students="team.assignedStudents"
                       v-model:team-selection="state.currentTeamSelection.value"
        />
      </GridContainer>
    </Section>
    <Section title="Rubric Selection">
      <template #icon>
        <ClipboardDocumentListIcon />
      </template>
    </Section>
    <ScrollButton :onclick="prepareRecord" label="Create Record">
      <template #icon>
        <ClipboardDocumentCheckIcon />
      </template>
    </ScrollButton>
  </VerticalStack>
</template>

<script setup lang="ts">
import {ClipboardDocumentCheckIcon} from "@heroicons/vue/16/solid";
import {UserGroupIcon, ClipboardDocumentListIcon} from "@heroicons/vue/20/solid";
import VerticalStack from "../../components/VerticalStack.vue";
import Section from "../../components/Section.vue";
import GridContainer from "../../components/GridContainer.vue";
import ScrollButton from "../../components/ScrollButton.vue";
import {onBeforeMount, ref, Ref} from "vue";
import {IRubricGroup, ITeam} from "../../types.ts";
import {useDatabase} from "../../composables/useDatabase.ts";
import TeamSelection from "../../components/TeamSelection.vue";

const {getAllTeams} = useDatabase()

interface IRubricSelectorViewState {
  teamSelections: Ref<Array<ITeam>>;
  rubricGroupSelections: Ref<Array<IRubricGroup>>;
  currentTeamSelection: Ref<ITeam | undefined>;
  currentRubricGroupSelection: Ref<IRubricGroup | undefined>;
}
const state: IRubricSelectorViewState = {
  teamSelections: ref([]),
  rubricGroupSelections: ref([]),
  currentTeamSelection: ref(undefined),
  currentRubricGroupSelection: ref(undefined),
}

onBeforeMount(() => {
  getAllTeams().then((teams: Array<ITeam>) => {
    console.log(teams)
    state.teamSelections.value = [...state.teamSelections.value, ...teams]
  })
})




const prepareRecord = () => {
  console.log('Preparing Record')
}

</script>

<style scoped>

</style>