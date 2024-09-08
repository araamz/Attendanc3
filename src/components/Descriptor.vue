<script setup lang="ts">
  import {computed} from "vue";

  interface IDescriptorProps {
    label: string;
    value: string;
    textColorDisable?: boolean;
  }
  const props = defineProps<IDescriptorProps>();

  const labelStyling = computed(() => {
    return `${!props.textColorDisable && 'text-neutral-400'} text-xs font-medium uppercase`
  })
  const valueStyling = computed(() => {
    return `${!props.textColorDisable && 'text-black'} text-right text-sm font-semibold`
  })

</script>

<template>
  <div class="flex flex-row gap-1 justify-between items-center py-0.5">
    <p :class='labelStyling'>
      {{ props.label }}
    </p>
    <p :class='valueStyling'>
      {{ props.value }}
    </p>
  </div>
</template>