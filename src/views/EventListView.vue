<template>
  <h1>Events for myself</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <RouterLink :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" v-if="page > 1">Previous</RouterLink>

    <RouterLink :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next</RouterLink>
  </div>
</template>

<script setup>
// Relative import
// import EventCard from '../components/EventCard.vue'
// Absolute import
import EventCard from '@/components/EventCard.vue'
import EventServices from '@/services/EventServices'
import { ref, onMounted, watchEffect } from 'vue'

const props = defineProps({
  page: {
    required: true
  },
})

const events = ref(null)

onMounted(() => {
  // watch effect wraps this thing, so it is updated, when reactive objects inside change
  watchEffect(() => {
    events.value = null
    EventServices.getEvents(2, props.page)
      .then(
        (response) => {
          events.value = response.data
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }
  )
}
)

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>