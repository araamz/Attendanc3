<script setup lang="ts">
import {RouterLinkProps} from "vue-router";

interface IPrimaryNavigationLinkProps extends RouterLinkProps {
  label: string;
}
const {label, to} = defineProps<IPrimaryNavigationLinkProps>()
</script>

<template>
  <router-link v-bind:to="to" class="flex flex-col gap-1 items-center text-neutral-400 md:flex-row md:gap-1.5" active-class="text-slate-600">
      <span class="[&>*]:size-4">
        <slot name="icon"/>
      </span>
    <p class="leading-0 text-xs font-medium md:text-sm uppercase">
      {{ label }}
    </p>
  </router-link>
</template>

<style scoped>

</style>
