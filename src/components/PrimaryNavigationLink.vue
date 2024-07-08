<script setup lang="ts">
import {RouterLinkProps} from "vue-router";

interface PrimaryNavigationLinkProps extends RouterLinkProps {
  label: string;
}
const {label, to} = defineProps<PrimaryNavigationLinkProps>()
</script>

<template>
  <router-link v-bind:to="to" class="flex flex-col gap-0.5 items-center text-neutral-400 md:flex-row md:gap-1.5" active-class="text-slate-600">
      <span class="[&>*]:size-4 md:[&>*]:size-7">
        <slot name="icon"/>
      </span>
    <p class="leading-0 text-xs font-medium md:text-sm">
      {{ label }}
    </p>
  </router-link>
</template>

<style scoped>

</style>
