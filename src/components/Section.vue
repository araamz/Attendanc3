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
    <HorizontalStack class="bg-slate-600 px-3 py-2 rounded-md text-white shadow">
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