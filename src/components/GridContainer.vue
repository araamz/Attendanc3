<script setup lang="ts">

</script>

<template>
  <div class="w-full @container/grid-container">
    <div class="flex flex-col gap-4 @md/grid-container:grid @md/grid-container:grid-cols-2 @3xl/grid-container:grid-cols-3 @4xl/grid-container:grid-cols-4 h-min">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
