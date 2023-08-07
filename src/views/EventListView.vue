<script setup>
// Relative import
// import EventCard from '../components/EventCard.vue'
// Absolute import
import EventCard from '@/components/EventCard.vue'
import EventServices from '@/services/EventServices'
import { ref, onMounted } from 'vue'

const events = ref(null)

onMounted(() => {
  EventServices.getEvents()
  .then(
    (response) => {
      events.value = response.data
    }
  )
  .catch(
    (error) => {
      console.log(error)}
  )
}
)

</script>

<template>
  <h1>Events for myself</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>