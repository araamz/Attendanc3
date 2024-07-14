<script setup lang="ts">
  import GridContainer from "../../components/GridContainer.vue";
  import RecordItem from "../../components/RecordItem.vue";
  import ScrollButton from "../../components/ScrollButton.vue";
  import {useRouter} from "vue-router";
  import { PlusIcon } from "@heroicons/vue/16/solid";
  import HorizontalStack from "../../components/VerticalStack.vue";


  const router = useRouter();
  const navigateNewRecordView = () => {
    router.push({
      name: "new_record",
    });
  }

</script>

<template>
  <HorizontalStack>
    <GridContainer>
      <RecordItem />
      <RecordItem />
      <RecordItem />
      <RecordItem />
    </GridContainer>
    <ScrollButton :onclick="navigateNewRecordView" label="New Record">
      <template #icon>
        <PlusIcon />
      </template>
    </ScrollButton>
  </HorizontalStack>
</template>

<style scoped>

</style>
