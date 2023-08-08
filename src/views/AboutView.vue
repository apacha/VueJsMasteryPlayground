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
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
        v-bind="dragOptions"
      >
        <template #item="{ element, index }">
          <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
            <font-awesome-icon icon="fa-solid fa-align-justify" class="handle" />
            <span class="text">{{ element.id }} </span>
            <input type="text" class="form-control" v-model="element.name" />
            <font-awesome-icon :icon="['fas', 'times']" class="close" @click="removeAt(index)"/>
          </div>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-2" :value="musicalDivisions" title="List" />
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
let id = 1
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
      musicalDivisions: [
        { name: 'Adagio', divisionType: 1, id: 0 },
        { name: 'Allegro', id: 1 },
        { name: 'Presto', id: 2 }
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
        group: "description",
        disabled: !this.enabled,
      }
    }
  },
  methods: {
    add: function () {
      this.musicalDivisions.push({ name: 'Juan ' + id, id: id++ })
    },
    replace: function () {
      this.musicalDivisions = [{ name: 'Edgard', id: id++ }]
    },
    removeAt(idx: number) {
      this.musicalDivisions.splice(idx, 1);
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

.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}

.close:hover {
    color: red;
    cursor: pointer;
}

.text {
  margin: 20px;
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
  width: 50%;
}


</style>
