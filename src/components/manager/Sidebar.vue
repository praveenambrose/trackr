<template>
    <div class="z-10 fixed transition-all bg-white" 
    :class="manager.sidebar ? ['translate-x-[0]']: ['translate-x-[-100%]']">
        <div class="w-80 min-h-[calc(100vh-80px)] flex flex-col border-r border-r-lines-light">
            <p class="text-medium-grey py-3 px-4 text-xs font-bold">ALL BOARDS ({{ boards.length }})</p>
            <div
                v-for="(board, index) in boards"
                :key="index"
                @click="onBoardClick(index)"
                class="flex items-center w-11/12 gap-4 rounded-r-full py-3 px-4 cursor-pointer font-medium fill-medium-grey"
                :class="manager.selectedBoard === index ? ['bg-main-purple', 'text-white', 'fill-white'] : ['text-medium-grey', 'hover:bg-main-purple', 'hover:bg-opacity-20', 'hover:text-main-purple']"
            >   
                <board-icon />
                <span>{{ board.boardName }}</span>
            </div>
            <div class="flex items-center w-11/12 gap-4 rounded-r-full py-3 px-4 cursor-pointer font-medium fill-main-purple text-main-purple" @click="onClick()">
                <board-icon />
                <span>+ Create new Project</span>
            </div>
            <div class="mt-auto pb-10" @click="manager.sidebar = false">
                <div class="flex items-center py-3 px-4 w-11/12 cursor-pointer text-medium-grey hover:bg-main-purple/10 rounded-r-full hover:text-main-purple hover:fill-main-purple">
                    <i class="mdi mdi-eye-off text-xl"></i>
                    <span class="ml-2 font-medium">Hide Sidebar</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useManagerStore } from '../../stores/manager';
import BoardIcon from '@/components/icon/BoardIcon.vue';
export default {
    name: 'Sidebar',
    components: {
        'board-icon': BoardIcon
    },
    data() {
        return {
        };
    },
    methods: {
        ...mapActions(useManagerStore, ['setMangerValues', ['setEditMode']]),
        onBoardClick(index) {
            this.manager.selectedBoard = index;
            this.$emit('boardSelected', index);
        },
        onClick() {
            this.setEditMode(false)
            this.setMangerValues('showBoardForm', true)
        }
    },
    computed: {
        ...mapState(useManagerStore, ['manager', 'boards'])
    }
}
</script>