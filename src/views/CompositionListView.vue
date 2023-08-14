<template>
  <h1>Compositions</h1>
  <div class="compositions">
    <div v-for="composition in compositions" :key="composition.id">
      {{ composition.id }} - {{ composition.title }}
    </div>
    <div class="pagination">
      <RouterLink
          :to="{ name: 'composition-list', query: { limit: limit, offset: offset - limit } }"
          rel="prev"
          :class="{ invisible: !hasPreviousPage }"
          id="page-prev"
      >&#60; Previous
      </RouterLink
      >
      <div v-for="p in totalPages" :key="p">
        <RouterLink :to="{ name: 'composition-list', query: { limit: limit, offset: (p-1) * limit } }" id="page-specific">
          &nbsp;{{ p }}&nbsp;
        </RouterLink>
      </div>
      <RouterLink
          :to="{ name: 'composition-list', query: { limit: limit, offset: offset + limit } }"
          rel="next"
          :class="{ invisible: !hasNextPage }"
          id="page-next"
      >
        Next &#62;
      </RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicCmsService from '@/services/MusicCmsService'
import {ref, onMounted, watchEffect, type Ref} from 'vue'
import {computed} from 'vue'
import {type Composition} from '@/types'

const props = defineProps({
  limit: {
    required: true,
    type: Number
  },
  offset: {
    required: true,
    type: Number
  }
})
const compositions: Ref<Composition[]> = ref([])
const totalCompositions = ref<number>(0)
const totalPages = computed<number>(() => Math.ceil(totalCompositions.value / props.limit))
const hasNextPage = computed<boolean>(() => props.offset + props.limit < totalCompositions.value)
const hasPreviousPage = computed<boolean>(() => props.offset >= props.limit)
const next = ref<string>("")
const previous = ref<string>("")

onMounted(() => {
  // watchEffect wraps this thing, so it is updated, when reactive objects inside change
  watchEffect(() => {
    // // Set the events to null, so the user immediately sees the effect of his action
    // compositions.value = []
    // Trigger a promise-based request to the API

    MusicCmsService.getCompositions(props.limit, props.offset)
        .then((response) => {
          let data = response.data;
          compositions.value = data['results']
          totalCompositions.value = data['count']
          next.value = data['next']
          previous.value = data['previous']
        })
        .catch((error) => {
          console.log(error)
        })
  })
})
</script>

<style scoped>
.compositions {
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
