<script setup lang="ts">
  interface IVerticalStack {
    spacing?: 'sm' | 'md' | 'lg'
  }

  const {spacing} = withDefaults(defineProps<IVerticalStack>(), {
    spacing: 'md'
  })

</script>

<template>
  <div :class="['flex flex-col', spacing === 'sm' ? 'gap-1' : spacing === 'md' ? 'gap-2' : 'gap-4']">
    <slot />
  </div>
</template>

<style scoped>

</style>