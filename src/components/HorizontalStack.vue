<script setup lang="ts">
interface IHorizontalStack {
  spacing?: 'sm' | 'md' | 'lg'
}

const {spacing} = withDefaults(defineProps<IHorizontalStack>(), {
  spacing: 'md'
})

</script>

<template>
  <div :class="['flex flex-row items-center w-full', spacing === 'sm' ? 'gap-1' : spacing === 'md' ? 'gap-2' : 'gap-4']">
    <slot />
  </div>
</template>

<style scoped>

</style>