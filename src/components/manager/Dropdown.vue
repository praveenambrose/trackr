<template>
    <div tabindex="1" class="group">
        <div>
            <svg class="fill-medium-grey cursor-pointer" width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
            </svg>
        </div>
        <div class="absolute right-2 top-20 hidden group-focus:block">
            <div class="rounded-lg w-36 flex flex-col z-10 bg-white shadow-l cursor-pointer">
                <p class="p-4 text-medium-grey text-xs w-full font-bold" @click="onEditboard()">Edit Board</p>
                <div class="p-4 text-red text-xs w-full font-bold" @click="onDelete()">Delete Board</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useManagerStore } from '../../stores/manager';
export default {
    name: 'Dropdown',
    methods: {
        ...mapActions(useManagerStore, ['setMangerValues', 'setEditMode', 'deleteBoard']),
        onEditboard() {
            this.setMangerValues('showBoardForm', true); 
            this.setEditMode(true);
        },
        onDelete(){
            this.setMangerValues('showDeleteDialog', true);
        }
    }
}
</script>