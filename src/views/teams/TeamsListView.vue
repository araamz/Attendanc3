<script setup lang="ts">

  import GridContainer from "../../components/GridContainer.vue";
  import TeamItem from "../../components/TeamItem.vue";
  import {useRouter} from "vue-router";
  import HorizontalStack from "../../components/VerticalStack.vue";
  import ScrollButton from "../../components/ScrollButton.vue";
  import {PlusIcon} from "@heroicons/vue/16/solid";

  const router = useRouter();
  const navigateNewRecordView = () => {
    router.push({
      name: "new_team",
    });
  }

</script>

<template>
  <HorizontalStack>
    <GridContainer>
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
      <TeamItem team-number="233" />
    </GridContainer>
    <ScrollButton :onclick="navigateNewRecordView" label="New Team">
      <template #icon>
        <PlusIcon />
      </template>
    </ScrollButton>
  </HorizontalStack>
</template>

<style scoped>

</style>
