<script setup lang="ts">

  interface ICheckboxProps {
    uniqueIdentifier: string;
    disabled?: boolean;
  }
  const {uniqueIdentifier, disabled} = defineProps<ICheckboxProps>()

  const model = defineModel<boolean>({
    default: false,
    required: true
  })

</script>

<template>
  <label :for="uniqueIdentifier" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full disabled:bg-red-100 disabled:text-red-300 has-[:checked]:bg-green-100 has-[:checked]:text-green-300 transition-colors">
    <input class="appearance-none hidden" type="checkbox" :disabled="disabled" :id="uniqueIdentifier"
           v-model="model"/>
    <span class="[&>*]:size-4">
        <slot name="icon"/>
      </span>
  </label>
</template>

<style scoped>

</style>

