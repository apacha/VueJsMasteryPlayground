<template>
  <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }" item-key="name">
    <template #item="{ element, index }">
      <div class="item-group">
        <div class="row item">
          <font-awesome-icon icon="fa-solid fa-align-justify" class="col-1 handle" />
          {{ element.name }}
          <div class="col-1">
            <font-awesome-icon :icon="['fas', 'times']" class="close" @click="removeAt(index)" />
          </div>
        </div>
        <nested-draggable :tasks="element.tasks" />
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
export default {
  name: 'nested-draggable',
  components: {
    draggable
  },
  methods: {
    removeAt(index: number) {
      console.log('removing in nested: ' + index)
      this.$emit('removeItem', index)
    }
  }
}
</script>

<script setup lang="ts">
import draggable from 'vuedraggable'
const props = defineProps({
  tasks: { type: Array, required: true }
})

const emit = defineEmits<{
  (e: 'removeItem', index: number): void
}>()

</script>

<style scoped>
/* .dragArea {
  min-height: 50px;
  outline: 1px dashed;
} */
.item-container {
  max-width: 20rem;
  margin: 0;
}

.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}
.item-sub {
  margin: 0 0 0 1rem;
}

close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}

.close:hover {
  color: red;
  cursor: pointer;
}
</style>
