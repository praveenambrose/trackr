import { defineStore } from "pinia" 

export const useManagerStore =  defineStore({
    id: "manager",
    state: () => ({
        manager: {
            selectedBoard: 0,
            overlay: false,
            showAddTaskForm: false,
            showBoardForm: false,
            sidebar: true,
            showDeleteDialog: false
        },
        editMode: false,
        selectedTask: null,
        boards: [],
        tasks: []
    }),
    actions: {
        setMangerValues(key, value) {
            this.manager[key] = value
            this.manager['overlay'] = value
        },
        addBoardValues(boardData) {
            this.boards.push(boardData)
        },
        editBoardValues({ index, boardName, boardColumns }) {
            this.boards.map(board => board.index === index ?
                (board.boardName = boardName, board.boardColumns = boardColumns) : board)
        },
        setEditMode(value) {
            this.editMode = value
        },
        setTasks(task){
            this.tasks.push(task)
        },
        changeTask(tasks){
            this.tasks = tasks
        },
        deleteBoard() {
            this.boards.splice(this.manager.selectedBoard, 1);
        },
        setSelectedTask(id) {
            this.selectedTask = id
        },
        updateTasK(task) {
            this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "manager",
                storage: localStorage,
                paths: ["manager", "boards", "tasks"]
            }
        ]
    }
})