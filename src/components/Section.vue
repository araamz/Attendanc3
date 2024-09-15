<script setup lang="ts">

  import HorizontalStack from "./HorizontalStack.vue";
  import VerticalStack from "./VerticalStack.vue";
  import {computed, useSlots} from "vue";

  interface ISectionProps {
    title: string | undefined;
  }
  const {title} = defineProps<ISectionProps>();

  const slots = useSlots()

  const hasIconSlot = computed(() => !!slots.icon)

</script>

<template>
  <VerticalStack>
    <HorizontalStack class="text-slate-600 rounded-md">
      <span class="[&>*]:size-4" v-if="hasIconSlot">
        <slot name="icon" />
      </span>
      <p class="font-medium text-sm">
        {{title}}
      </p>
    </HorizontalStack>
    <div>
      <slot />
    </div>
  </VerticalStack>
</template>

<style scoped>

</style>