<script setup lang="ts">

  import HorizontalStack from "./HorizontalStack.vue";
  import VerticalStack from "./VerticalStack.vue";

  interface ISectionProps {
    title: string | undefined;
  }
  const {title} = defineProps<ISectionProps>();

</script>

<template>
  <VerticalStack>
    <HorizontalStack class="text-slate-600 rounded-md">
      <span class="[&>*]:size-4">
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