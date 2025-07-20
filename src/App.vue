<template>
  <app-header></app-header>
  <main>
    <div class="flex w-full">
      <sidebar @boardSelected="(val) => manager.selectedBoard = val"></sidebar>
      <div class="w-screen h-[calc(100vh-80px)] bg-light-grey overflow-auto" style="scrollbar-width: none; -ms-overflow-style: none;"
        :class="manager.sidebar ? 'sm:pl-[256px] lg:pl-[340px]' : ''">
        <div class="h-full">
          <board />
        </div>
      </div>
    </div>
    <ShowSidebar />
  </main>
  <bgOverlay />
  <div class="absolute top-1/2 left-1/2 w-11/12 max-w-xs z-10 translate-x-[-50%] translate-y-[-50%]">
    <AddNewTask v-if="manager.showAddTaskForm" @close="onTaskClose()"/>
    <BoardForm  v-if="manager.showBoardForm" :board-selected="manager.selectedBoard" @close="setMangerValues('showBoardForm', false)"/>
    <DeleteDialog v-if="manager.showDeleteDialog" @close="setMangerValues('showDeleteDialog', false)"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/manager/Sidebar.vue';
import Board from './components/board/Board.vue';
import AddNewTask from './components/manager/AddNewTask.vue';
import BoardForm from './components/manager/BoardForm.vue';
import ShowSidebar from './components/manager/ShowSidebar.vue';
import bgOverlay from './components/bgOverlay.vue';
import DeleteDialog from './components/manager/DeleteDialog.vue';
import { useManagerStore } from './stores/manager';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'sidebar': Sidebar,
    'board': Board,
    AddNewTask,
    BoardForm,
    bgOverlay,
    ShowSidebar,
    DeleteDialog
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useManagerStore, ['manager'])
  },
  methods: {
    ...mapActions(useManagerStore, ['setMangerValues', 'setSelectedTask', 'setEditMode']),
    onTaskClose() {
      this.setEditMode(false);
      this.setSelectedTask(null);
      this.setMangerValues('showAddTaskForm', false);
    }
  }
};
</script>
