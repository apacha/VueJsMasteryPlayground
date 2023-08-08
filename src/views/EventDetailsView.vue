<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import EventServices from '@/services/EventServices'
import type { EventItem } from '@/types';
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js';

// const event: Ref<EventItem> = ref(null)
  const event: Ref<EventItem | null> = ref(null)

const props = defineProps({
  id: {
    required: true,
    type: Number
  },
})

onMounted(() => {
  // fetch event (by id) and set local event data
  EventServices.getEventDetails(props.id)
    .then(
      (response) => {
        event.value = response.data
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
})
</script>

<style></style>