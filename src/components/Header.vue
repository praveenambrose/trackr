<template>
    <div class="w-full flex items-center pr-4">
        <div class="flex items-center pl-6 h-20 border-r border-r-lines-light"
            :class="manager.sidebar ? 'w-[340px]' : 'w-[200px]'" @click="$emit('toggleSidebar')"
        >
            <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8 mr-2">
            <span class="text-2xl font-bold">Trackr</span>  
        </div>
        <div class="flex items-center mx-auto h-20 gap-4 w-10/12">
            <h1 class="text-black font-medium ml-4 text-2xl">Project Tracker</h1>
            <div class="flex items-center ml-auto gap-4">
                <add-button @click="addProject()"> + Add New Task </add-button>
                <dropdown />
            </div>
        </div>
    </div>
</template>

<script>
import AddButton from './buttons/AddButton.vue';
import Dropdown from './manager/Dropdown.vue';
import { useManagerStore } from '../stores/manager';
import { mapState, mapActions } from 'pinia';

export default{
    name: 'Header',
    components: {
        'add-button': AddButton,
        'dropdown': Dropdown
    },
    data() {
        return {
        // You can add data properties here if needed
        };
    },
    computed: {
        ...mapState(useManagerStore, ['manager'])
    },
    methods: {
        ...mapActions(useManagerStore, ['setMangerValues']),
        addProject() {
            this.setMangerValues('showAddTaskForm', true)
            return
        }
    }
}
</script>