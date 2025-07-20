<template>
    <article @click="onTaskClick()" draggable="true" @dragstart="$emit('dragstart', $event)"
    class="bg-white rounded-lg cursor-pointer shadow-task my-2 p-4 max-w-[280px] font-bold flex flex-col gap-3 break-all">
        <h3 class="text-black">{{ task.title }} </h3>
        <p class="text-medium-grey text-xs">{{ task.description }}</p>
    </article>
</template>

<script>
import { mapActions } from 'pinia';
import { useManagerStore } from '../../stores/manager';
export default {
    name: 'Tasks',
    props: {
       task: {
        type: Object,
        required: true
       }
    },
    methods: {
        ...mapActions(useManagerStore, ['setMangerValues', 'setEditMode', 'setSelectedTask']),
        onTaskClick() {
            this.setEditMode(true),
            this.setSelectedTask(this.task.id),
            this.setMangerValues('showAddTaskForm', true)
        }
    }
}
</script>