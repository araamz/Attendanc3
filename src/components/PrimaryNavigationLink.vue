<script setup lang="ts">
import {RouterLinkProps} from "vue-router";

interface IPrimaryNavigationLinkProps extends RouterLinkProps {
  label: string;
  exact?: boolean;
}
const {label, exact, to} = defineProps<IPrimaryNavigationLinkProps>()
</script>

<template>
  <router-link v-bind:to="to" class="flex flex-col gap-1 items-center text-neutral-400" :exact-active-class="exact ? 'text-slate-600' : undefined" :active-class="!exact ? 'text-slate-600' : undefined">
      <span class="[&>*]:size-4">
        <slot name="icon"/>
      </span>
    <p class="leading-0 text-xs font-medium md:text-sm uppercase md:text-center">
      {{ label }}
    </p>
  </router-link>
</template>

<style scoped>

</style>
