<script setup lang="ts">



import StatusBar from "./components/StatusBar.vue";
</script>

<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <main>
    <RouterView />
    <StatusBar />
  </main>
</template>

<style scoped>

</style>
