<template>
  <h1>Events for myself</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" v-if="page > 1" id="page-prev">&#60; Previous</RouterLink>

      <RouterLink :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next" v-if="hasNextPage" id="page-next">Next &#62;</RouterLink>
    </div>
  </div>
</template>

<script setup>
// Relative import
// import EventCard from '../components/EventCard.vue'
// Absolute import
import EventCard from '@/components/EventCard.vue'
import EventServices from '@/services/EventServices'
import { ref, onMounted, watchEffect } from 'vue'
import { computed } from "@vue/reactivity"

const props = defineProps({
  page: {
    required: true,
    type: Number
  },
})

const hasNextPage = computed({
  get() {
    var totalPages = Math.ceil(totalEvents.value / pageSize)
    return props.page < totalPages
  }
})

const events = ref(null)
const totalEvents = ref(null)
const pageSize = 2

onMounted(() => {
  // watchEffect wraps this thing, so it is updated, when reactive objects inside change
  watchEffect(() => {
    // Set the events to null, so the user immediately sees the effect of his action
    events.value = null
    // Trigger a promise-based request to the API
    EventServices.getEvents(2, props.page)
      .then(
        (response) => {
          events.value = response.data
          totalEvents.value = response.headers['x-total-count']
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>