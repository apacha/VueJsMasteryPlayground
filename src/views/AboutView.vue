<template>
  <div class="row">
    <div class="col-2">
      <div class="form-group">
        <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>

        <div class="form-check">
          <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input" />
          <label class="form-check-label" for="disabled">DnD enabled</label>
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
          <div class="row border" :class="{ 'not-draggable': !enabled }">
            <font-awesome-icon icon="fa-solid fa-align-justify" class="col-1 handle" />
            <div class="col-1">{{ element.id }}</div>
            <div class="col-5">
              <input type="text" class="form-control" v-model="element.name" />
            </div>
            <div class="col-3">
              <select class="form-select" v-model="element.type">
                <option disabled value="">Please select one</option>
                <option>Movement</option>
                <option>Act</option>
                <option>Scene</option>
              </select>
            </div>
            <div class="col-1">
              <font-awesome-icon :icon="['fas', 'times']" class="close" @click="removeAt(index)" />
            </div>
          </div>
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
let id = 3

type MusicalDivisionType = 'Movement' | 'Act' | 'Scene'
interface MusicalDivision {
  id: number
  name: string
  divType: MusicalDivisionType
  nested: MusicalDivision[]
}
let sampleDivisions: MusicalDivision[] = [
  { id: 0, name: 'Adagio', divType: 'Movement', nested: [] },
  { id: 1, name: 'Allegro', divType: 'Movement', nested: [] },
  {
    id: 2,
    name: 'Presto',
    divType: 'Movement',
    nested: [{ id: 3, name: 'Inner-1', divType: 'Act', nested: [] }]
  }
]

export default {
  name: 'simpleDraggable',
  display: 'Simple',
  order: 0,
  components: {
    draggable
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
      this.musicalDivisions.push({ name: '', divType: 'Movement', id: id++, nested: [] })
    },
    replace: function () {
      this.musicalDivisions = [{ name: 'Edgard', divType: 'Movement', id: id++, nested: [] }]
    },
    removeAt(idx: number) {
      this.musicalDivisions.splice(idx, 1)
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
