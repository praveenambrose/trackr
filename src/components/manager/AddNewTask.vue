<template>
    <form ref="taskform" @submit.prevent="onSubmit" class="bg-white rounded-lg p-1">
        <div class="p-3 max-h-[90vh] overflow-y-auto">
           <h2 class="font-medium">{{ editMode ? `Edit ${taskTitle}` : 'Add New Task' }}</h2>
           <base-input v-model="taskTitle" :placeholder="'e.g. Test Task'">Title</base-input>
           <base-textarea v-model="taskDesc" inputName="Description" :placeholder="'e.g. Test Description'"></base-textarea>
           <p class="text-medium-grey text-xs font-bold pt-2">Status</p>
           <base-select :option-value="boards[manager.selectedBoard].boardColumns" @onSelect="(obj) => status=obj.name" :value="status"/>
            <add-button @click="createTask()">
                {{editMode ? 'Save Changes' : 'Create Task'}}
            </add-button>
        </div>
    </form>
</template>

<script>
import BaseInput from '../form/BaseInput.vue';
import BaseTextArea from '../form/BaseTextArea.vue'
import BaseSelect from '../form/BaseSelect.vue';
import AddButton from '../buttons/AddButton.vue';
import { mapState, mapActions } from 'pinia';
import { useManagerStore } from '../../stores/manager';
import { v4 as uuidv4 } from 'uuid';
export default {
    name: 'AddNewTask',
    components: {
        'base-input': BaseInput,
        'base-textarea' : BaseTextArea,
        'base-select': BaseSelect,
        'add-button': AddButton
    },
    data: () => {
        return {
            taskTitle: '',
            taskDesc: '',
            status: ''
        }
    },
    mounted() {
        if(this.selectedTask) {
            const task = this.tasks.find(task => task.id === this.selectedTask);
            this.taskTitle = task.title;
            this.taskDesc = task.description;
            this.status = task.status;
        }
        document.addEventListener('mouseup', this.handleClickoutside)
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', this.handleClickoutside)
    },
    methods: {
        ...mapActions (useManagerStore, ['setTasks', 'updateTasK']),
        handleClickoutside(event) {
            if (this.$refs.taskform && !this.$refs.taskform.contains(event.target)) {
                this.$emit('close');
            }
        },
        createTask() {
            if(this.editMode) {
                const task = this.tasks.find(task => task.id === this.selectedTask);
                task.title = this.taskTitle;
                task.description = this.taskDesc;
                task.status = this.status;
                this.updateTasK(task);
            } else {
                const task = {
                    id: uuidv4(),
                    boardId: this.boards[this.manager.selectedBoard].index,
                    title: this.taskTitle,
                    description: this.taskDesc,
                    status: this.status
                };
                this.setTasks(task)
            }            
            this.$emit('close');
            return;
        },

    },
    computed: {
        ...mapState(useManagerStore, ['manager', 'boards', 'tasks', 'editMode', 'selectedTask', 'selectedBoard'])
    }
}
</script>