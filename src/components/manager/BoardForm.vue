<template>
    <form ref="boardform" @submit.prevent="onSubmit" class="bg-white rounded-lg p-1">
        <div class="p-3 max-h-[90vh] overflow-y-auto">
            <h2 class="font-medium">{{ editMode ? 'Edit Board' : 'Add New Board'  }}</h2>
            <base-input ref="firstInput" v-model="boardName">Board Name</base-input>
            <p class="text-medium-grey text-xs font-bold">Board Columns</p>
            <div v-for="(value, index) in boardColumns" :key="index">
                <div class="flex items-center gap-2">
                    <base-input :ref="el => inputsRefs[index] = el" v-model="boardColumns[index]" class="w-full" :placeholder="placeholders[index] || 'e.g. New Column'"></base-input>
                    <IconCross class="cursor-pointer" @click="removeColumn(index)"/>
                </div>
            </div>
            <button type="button" class="rounded-full bg-main-purple bg-opacity-20 w-full py-3 my-3 px-4 text-main-purple text-sm font-medium" @click="addColumn()">
                Add New Task
            </button>
            <add-button @click="createBoard()">
                {{ editMode ? 'Save Changes' : 'Create New Board' }}
            </add-button>
        </div>
    </form>
</template>

<script>
import { v4 as uuidv4, validate } from 'uuid';
import { mapActions, mapState } from 'pinia';
import { useManagerStore } from '../../stores/manager';
import BaseInput from '../form/BaseInput.vue';
import AddButton from '../buttons/AddButton.vue';
import IconCross from '../icon/IconCross.vue';
export default {
    name: 'BoardForm',
    props: {
        boardSelected: {
            type: Number,
            default: 0
        }
    },
    components: {
        'base-input': BaseInput,
        'add-button': AddButton,
        IconCross
    },
    data() {
        return {
            boardName: '',
            placeholders: ['e.g.todo', 'e.g.In Progress', 'e.g.Done'],
            boardColumns: ['', ''],
            inputsRefs: []
        }
    },
    mounted() {
        console.log('BoardForm mounted', this.editMode);
        if(this.editMode) {
            this.boardName = this.boards[this.boardSelected].boardName;
            this.boardColumns = [...this.boards[this.boardSelected].boardColumns];
        }
        document.addEventListener('mouseup', this.handleClickoutside)
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', this.handleClickoutside)
    },
    methods: {
        ...mapActions(useManagerStore, ['addBoardValues', 'editBoardValues']),
        addColumn() {
           this.boardColumns.push('');
        },
        removeColumn(index) {
            this.boardColumns.splice(index, 1);
        },
        handleClickoutside(event) {
            if (this.$refs.boardform && !this.$refs.boardform.contains(event.target)) {
                this.$emit('close');
            }
        },
        createBoard() {
            if(this.validate()) {
                !this.editMode ?
                this.addBoardValues({
                    index: uuidv4(),
                    boardName: this.boardName,
                    boardColumns: this.boardColumns
                }) :
                this.editBoardValues({
                    index: this.boards[this.boardSelected].index,
                    boardName: this.boardName,
                    boardColumns: this.boardColumns
                });
                this.$emit('close');
            }
        },
        validate() {
            let valid = true;
            if(this.$refs.firstInput.modelValue.trim() === '') {
                this.$refs.firstInput.error = true;
                valid = false;
            }
            this.inputsRefs.forEach(e => {
                if(e.modelValue.trim() === '') {
                    e.error = true;
                    valid = false;
                }
            })
            return valid;
        }
    },
    computed: {
        ...mapState(useManagerStore, ['boards', 'editMode']),
    }
}
</script>