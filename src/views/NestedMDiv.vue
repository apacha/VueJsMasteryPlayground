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
      <h3>Nested Musical Divisions</h3>
      <nested-draggable :musical-divisions="musicalDivisions" @removeItem="removeAt" />
    </div>
    <rawDisplayer class="col-3" :value="musicalDivisions" title="List" />
  </div>
</template>

<script lang="ts">
import type { MusicalDivision } from '@/types'
import { MusicalDivisionType } from '@/types'
import draggable from 'vuedraggable'

export default {
  name: 'nested-divisions',
  display: 'Nested Musical Divisions',
  order: 0,
  components: {
    draggable
  },
  data() {
    return {
      globalid: 7,
      enabled: true,
      musicalDivisions: [
        { id: 0, name: 'Adagio', divType: MusicalDivisionType.Movement, nested: [] },
        { id: 1, name: 'Allegro', divType: MusicalDivisionType.Movement, nested: [] },
        {
          id: 2,
          name: 'Presto',
          divType: MusicalDivisionType.Movement,
          nested: [{ id: 3, name: 'Inner-1', divType: MusicalDivisionType.Act, nested: [] }]
        }
      ],
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
      this.musicalDivisions.push({ id: this.globalid++, name: '', divType:MusicalDivisionType.Movement, nested: [] })
    },
    removeAt(id: number) {
      window.console.log('Searching for: ' + id)
      this.removeById(id, this.musicalDivisions)
    },
    removeById(id: number, musicalDivisions: Array<MusicalDivision>) {
      let index: number = musicalDivisions.findIndex((element) => element.id === id)
      if (index >= 0) {
        window.console.log('Deleting: ' + id + ' at index ' + index)
        musicalDivisions.splice(index, 1)
      } else {
        // Go into each child and recursively try to delete from there
        for (let inner = 0; inner < musicalDivisions.length; inner++) {
          const element = musicalDivisions[inner]
          window.console.log('Searching for: ' + id + ' in element with ID ' + element.id)
          this.removeById(id, element.nested)
        }
      }
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

.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}

.row {
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

.ghost {
  opacity: 0.5;
  background: #aad4e8;
}

.not-draggable {
  cursor: no-drop;
}

input {
  display: inline-block;
  /* width: 50%; */
}
</style>
