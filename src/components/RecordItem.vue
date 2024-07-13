<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import GridItem from "./GridItem.vue";
import Descriptor from "./Descriptor.vue";
import IconButton from "./IconButton.vue";
import DescriptorContainer from "./DescriptorContainer.vue";
import {PencilIcon, PlusIcon} from "@heroicons/vue/16/solid";
</script>

<template>
  <GridItem class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-center">
      <p class="font-medium">
        TEAM #243
      </p>
      <p class="text-neutral-400 font-medium leading-0">
        Toxic ☢️
      </p>
    </div>
    <DescriptorContainer>
      <Descriptor label="table" value="6" />
      <Descriptor label="section" value="1204" />
      <Descriptor label="lead mentor" value="John Doe" />
      <Descriptor label="date created" value="12/15/2024" />
      <Descriptor label="time created" value="3:15 p.m." />
    </DescriptorContainer>
    <p class="mt-auto font-medium">
      Emily Johnson, Marcus Rodriguez, Amanda Smith, Benjamin Lee, Sophia Martinez
    </p>
    <div class="flex flex-row justify-between items-center">
      <IconButton label="" class="bg-green-100 text-green-300 aspect-square p-1.5 rounded-full">
        <template #icon>
          <PlusIcon />
        </template>
      </IconButton>
      <IconButton label="" class="bg-neutral-100 text-neutral-300 aspect-square p-1.5 rounded-full">
        <template #icon>
          <PencilIcon />
        </template>
      </IconButton>
    </div>
  </GridItem>
</template>