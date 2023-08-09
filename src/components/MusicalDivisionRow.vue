<template>
  <div class="row border">
    <font-awesome-icon icon="fa-solid fa-align-justify" class="col-1 handle" />
    <div class="col-1">{{ musicalDivision.id }}</div>
    <div class="col-5">
      <input type="text" class="form-control" v-model="musicalDivision.name" />
    </div>
    <div class="col-3">
      <select class="form-select" v-model="musicalDivision.divType">
        <option disabled value="">Please select one</option>
        <option v-for="v in MusicalDivisionType">{{ MusicalDivisionType[v] }}</option>
      </select>
    </div>
    <div class="col-1">
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="close"
        @click="removeMusicalDivision(musicalDivision.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicalDivisionType, type MusicalDivision } from '@/types'
import type { PropType } from 'vue'

defineProps({
  musicalDivision: {
    type: Object as PropType<MusicalDivision>,
    required: true
  }
})

defineEmits<{
  (e: 'removeMusicalDivision', id: number): void
}>()
</script>
<script lang="ts">
export default {
  name: 'musical-division-row',
  methods: {
    removeMusicalDivision(id: number) {
      console.info("Removing inside " + id)
      this.$emit('removeMusicalDivision', id)
    }
  }
}
</script>

<style scoped>
.handle {
  padding-top: 8px;
  padding-bottom: 8px;
}

.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}

.close:hover {
  color: red;
  cursor: pointer;
}
</style>
