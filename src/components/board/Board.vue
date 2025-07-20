<template>
    <div class="flex gap-6 px-4 h-full">
        <section v-for="(item, columnIndex) in columns" :key="columnIndex" class="flex flex-col box-content min-w-[280px]">
            <div class="flex items-center gap-3 py-4">
                <div class="rounded-full h-4 w-4" :style="{ backgroundColor: randomColourGenerator() }"></div>
                <h2 class="text-medium-grey font-medium text-xs uppercase">{{ item }}</h2>
            </div>
            <TransitionGroup name="tasks" tag="div">
                <div v-for="task in tasksOfBoard.filter(task => task.status.toLowerCase() == item.toLowerCase())" :key="task.id">
                    <task :task="task" 
                        @dragstart="onDragTask($event, task, task.id)"
                        @dragend="ondragEnd(task)"
                    />
                </div>
            </TransitionGroup>
            <div @dragenter="onDragEnterColumn(item)" class="h-full mt-5" />
        </section>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useManagerStore } from '@/stores/manager'
import Task from './Task.vue'
export default {
    name: 'Board',
    components: {
        'task': Task
    },
    data() {
        return {
            draggedTask: null
        };
    },
    methods: {
        ...mapActions(useManagerStore, ['changeTask', 'setTasks']),
        randomColourGenerator() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        onDragTask(evt, task, taskId) {
            this.draggedTask = {
                el: evt.target,
                task,
                taskId
            }
            let nowTask = this.tasks.filter(t => t.id !== taskId);
            this.changeTask(nowTask)
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
        },
        onDragEnterColumn(item){
            this.draggedTask.task.status = item;
        },
        ondragEnd(task) {
            this.setTasks({
                ...task,
                status: task.status
            })
        }
    },
    computed: {
        ...mapState(useManagerStore, ['manager', 'boards', 'tasks']),
        columns() {
            return this.boards.length ? this.boards[this.manager.selectedBoard].boardColumns: [];
        },
        tasksOfBoard() {
            return this.tasks.filter(task => task.boardId === this.boards[this.manager.selectedBoard].index);
        }
    }
};
</script>

<style>
.tasks-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}

.tasks-enter-active {
  transition: all 0.5s ease;

}
</style>