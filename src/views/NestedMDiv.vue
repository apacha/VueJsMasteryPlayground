<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested Musical Divisions</h3>
      <nested-draggable :tasks="taskList" @removeItem="removeAt"  />
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
      enabled: true,
      taskList: [
        {
          name: 'task 1',
          tasks: [
            {
              name: 'task 2',
              tasks: []
            }
          ]
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: []
            }
          ]
        },
        {
          name: 'task 5',
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
      this.taskList.push({ name: '', tasks: [] })
    },
    replace: function () {
      this.taskList = [{ name: 'Edgard', tasks: [] }]
    },
    removeAt(index: number) {
      window.console.log('removing: ' + index)
      this.taskList.splice(index, 1)
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
