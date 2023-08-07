<template>
  <h1>Events for myself</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" :class="{ invisible: !hasPreviousPage}" id="page-prev">&#60;
        Previous</RouterLink>
      <div v-for="p in totalPages">
        <RouterLink :to="{ name: 'event-list', query: { page: p } }" id="page-specific">
          &nbsp;{{ p }}&nbsp;
        </RouterLink>
      </div>
      <RouterLink :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next" :class="{ invisible: !hasNextPage}" id="page-next">
        Next &#62;</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Relative import
// import EventCard from '../components/EventCard.vue'
// Absolute import
import EventCard from '@/components/EventCard.vue'
import EventServices from '@/services/EventServices'
import { ref, onMounted, watchEffect, defineComponent, type Ref } from 'vue'
import { computed } from "@vue/reactivity"
import { type EventItem } from '@/types'

const props = defineProps({
  page: {
    required: true,
    type: Number
  },
})
const events: Ref<EventItem[]> = ref([])
const totalEvents = ref<number>(0)
const pageSize = 2
const totalPages = computed<number>(() => Math.ceil(totalEvents.value / pageSize))
const hasNextPage = computed<boolean>(() => props.page < totalPages.value)
const hasPreviousPage = computed<boolean>(() => props.page > 1)

onMounted(() => {
  // watchEffect wraps this thing, so it is updated, when reactive objects inside change
  watchEffect(() => {
    // Set the events to null, so the user immediately sees the effect of his action
    events.value = []
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

#page-specific {
  text-align: center;
}

#page-next {
  text-align: right;
}

.invisible {
  visibility: hidden;
}

</style>