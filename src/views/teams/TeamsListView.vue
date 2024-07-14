<script setup lang="ts">

  import GridContainer from "../../components/GridContainer.vue";
  import GridItem from "../../components/GridItem.vue";
  import TeamItem from "../../components/TeamItem.vue";
  import {useRouter} from "vue-router";
  import HorizontalStack from "../../components/HorizontalStack.vue";
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
    <GridContainer class="">
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
