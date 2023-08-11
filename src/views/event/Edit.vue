<template>
    <p>Edit the event {{ event.title }} here</p>
  </template>
  
  <script setup lang="ts">
  import type { EventItem } from '@/types'
  import type { PropType } from 'vue/dist/vue.js'
  
  const props = defineProps({
    event: {
      required: true,
      type: Object as PropType<EventItem>
    }
  })
  </script>
  
  <style></style>
  