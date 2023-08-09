<template>
  <draggable
    :list="musicalDivisions"
    :group="{ name: 'g1' }"
    class="dragArea"
    tag="ul"
    ghost-class="ghost"
    item-key="id"
    animation=200
  >
    <template #item="{ element, index }">
      <div class="item-group">
        <MusicalDivisionRow
          class="item"
          :musicalDivision="element"
          :key="element.id"
          @remove-musical-division="removeAt"
        />
        <nested-draggable
          class="item-sub"
          :musical-divisions="element.nested"
          @removeItem="removeAt"
        />
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
import MusicalDivisionRow from '@/components/MusicalDivisionRow.vue'
import { type MusicalDivision } from '@/types';
import draggable from 'vuedraggable'

defineProps({
  musicalDivisions: { type: Array<MusicalDivision>, required: true }
})
defineEmits<{
  (e: 'removeItem', id: number): void
}>()
</script>

<style scoped>
/* .dragArea {
  min-height: 30px;
  outline: 1px dashed;
} */
.ghost {
  opacity: 0.5;
  color: #5dc7d1;
}
.item-container {
  max-width: 70rem;
  margin: 0;
}
.item {
  padding: 12px;
  border: solid black 1px;

}
.item-sub {
  margin: 0px;
}
</style>
