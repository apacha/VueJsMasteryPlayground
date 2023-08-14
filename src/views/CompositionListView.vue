<template>
  <h1>Compositions</h1>
  <div class="compositions">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Composers</th>
        <th scope="col">Number</th>
        <th scope="col">Opus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="composition in compositions" :key="composition.id">
        <th scope="row">
          <!--          <a href="">-->
          {{ composition.id }}
          <!--          </a>-->
        </th>
        <td>{{ composition.title }}</td>
        <td>{{ composition.composers.join(", ") }}</td>
        <td>{{ composition.number }}</td>
        <td>{{ composition.opus }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <RouterLink
            :to="{ name: 'composition-list', query: { limit: limit, offset: offset - limit } }"
            rel="prev"
            :class="{ disabled: !hasPreviousPage }"
            class="page-link"
            id="page-prev">
          Previous
        </RouterLink>
      </li>
      <li class="page-item" v-for="(p, index) in totalPages" :key="p">
        <RouterLink :to="{ name: 'composition-list', query: { limit: limit, offset: (p-1) * limit } }"
                    :class="{ active: index===activePage}"
                    class="page-link"
                    id="page-specific">
          &nbsp;{{ p }}&nbsp;
        </RouterLink>
      </li>
      <li class="page-item">
        <RouterLink
            :to="{ name: 'composition-list', query: { limit: limit, offset: offset + limit } }"
            rel="next"
            :class="{ disabled: !hasNextPage }"
            class="page-link"
            id="page-next">
          Next
        </RouterLink>
      </li>

    </ul>
  </nav>

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
const activePage = computed<number>(() => props.offset / props.limit)
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
