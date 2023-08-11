<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventService from '@/services/EventServices'
import type { EventItem } from '@/types'
import { ref, onMounted } from 'vue'

const event = ref<EventItem>()
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  EventService.getEventDetails(props.id)
    .then((response: any) => {
      event.value = response.data
    })
    .catch((error: any) => {
      console.log(error)
    })
})
</script>
