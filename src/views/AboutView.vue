<template>
  <div class="row">
    <div class="col-2">
      <div class="form-group">
        <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="add">Add</button>
        </div>
      </div>
    </div>

    <div class="col-6">
      <h3>Musical Divisions</h3>
      <draggable
        :list="musicalDivisions"
        item-key="id"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
        v-bind="dragOptions"
      >
        <template #item="{ element, index }">
          <MusicalDivisionRow
            :musicalDivision="element"
            :key="element.id"
            @remove-musical-division="removeAt"
          />
        </template>
      </draggable>
    </div>

    <div class="col-4">
      <rawDisplayer :value="musicalDivisions" title="List" />
    </div>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import type { MusicalDivision } from '@/types'
import { MusicalDivisionType } from '@/types'
import MusicalDivisionRow from '@/components/MusicalDivisionRow.vue'

let id = 3
let sampleDivisions: MusicalDivision[] = [
  { id: 0, name: 'Adagio', divType: MusicalDivisionType.Movement, nested: [] },
  { id: 1, name: 'Allegro', divType: MusicalDivisionType.Movement, nested: [] },
  {
    id: 2,
    name: 'Presto',
    divType: MusicalDivisionType.Movement,
    nested: [{ id: 3, name: 'Inner-1', divType: MusicalDivisionType.Act, nested: [] }]
  }
]

export default {
  name: 'simpleDraggable',
  display: 'Simple',
  order: 0,
  components: {
    draggable,
    MusicalDivisionRow
  },
  data() {
    return {
      enabled: true,
      musicalDivisions: sampleDivisions,
      dragging: false
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.enabled
      }
    }
  },
  methods: {
    add: function () {
      this.musicalDivisions.push({
        name: '',
        divType: MusicalDivisionType.Movement,
        id: id++,
        nested: []
      })
    },
    removeAt(id: number) {
      let index: number = this.musicalDivisions.findIndex((element) => element.id === id)
      this.musicalDivisions.splice(index, 1)
    },
    checkMove: function (e: any) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
    }
  }
}
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

.row {
  padding-top: 8px;
  padding-bottom: 8px;
}

.ghost {
  opacity: 0.5;
  background: #aae5e8;
}
</style>
