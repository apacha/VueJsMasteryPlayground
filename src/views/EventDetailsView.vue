<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import EventServices from '@/services/EventServices'
import { ref, onMounted } from 'vue'

const event = ref(null)

const props = defineProps({
  id: {
    required: true
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