<template>
  <div class="row">
    <div class="col-2">
      <div class="form-group">
        <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>
      </div>
    </div>
    <div class="col-6">
      <h3>Nested Musical Divisions</h3>
      <nested-draggable :tasks="taskList" @removeItem="removeAt" />
    </div>
    <rawDisplayer class="col-3" :value="taskList" title="List" />
  </div>
</template>

<script lang="ts">
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
      taskList: [
        {
          id: 1,
          name: 'task 1',
          tasks: [{ id: 2, name: 'task 2', tasks: [{ id: 3, name: 'task 3', tasks: [] }] }]
        },
        {
          id: 4,
          name: 'task 4',
          tasks: [{ id: 6, name: 'task 5', tasks: [] }]
        },
        {
          id: 6,
          name: 'task 6',
          tasks: []
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
      this.taskList.push({ id: this.globalid++, name: '', tasks: [] })
    },
    replace: function () {
      this.taskList = [{ id: this.globalid++, name: 'Edgard', tasks: [] }]
    },
    removeAt(id: number) {
      window.console.log('Searching for: ' + id)
      this.removeById(id, this.taskList)
    },
    removeById(id: number, taskList: Array<Object>) {
      let index: number = taskList.findIndex((element) => element.id === id)
      if (index >= 0){
        window.console.log('Deleting: ' + id + " at index " + index)
        taskList.splice(index, 1)
      } else {
        // Go into each child and recursively try to delete from there
        for (let inner = 0; inner < taskList.length; inner++) {
          const element = taskList[inner];
          window.console.log('Searching for: ' + id + " in element with ID " + element.id)
          this.removeById(id, element.tasks)
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
