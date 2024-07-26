<script setup lang="ts">

</script>

<template>
  <div class="w-full @container">
    <div class="flex flex-col gap-4 @md:grid @md:grid-cols-2 @3xl:grid-cols-3 content-center h-min">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
