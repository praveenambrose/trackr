<template>
    <div ref="dialog" class="bg-white rounded-lg">
        <div class="p-3 flex flex-col gap-6">
            <h4 class="text-red font-medium text-lg">Delete this board</h4>
            <p class="text-medium-grey">
                Are you sure you want to delete this board ?
            </p>
            <div class="flex flex-col gap-4">
                <button class="w-full bg-red text-white rounded-full p-1 font-medium" @click="OnDelete()">
                    Delete
                </button>
                <button class="w-full bg-main-purple bg-opacity-30 text-main-purple rounded-full p-1 font-medium" @click="setMangerValues('showDeleteDialog', false)">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useManagerStore } from '../../stores/manager';
export default {
    name: 'DeleteDialog',
    mounted() {
        document.addEventListener('mouseup', this.handleClick)
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', this.handleClick)
    },
    methods: {
        ...mapActions(useManagerStore, ['deleteBoard', 'setMangerValues']),
        OnDelete() {
            this.deleteBoard();
            this.setMangerValues('showDeleteDialog', false);
        },
        handleClick(event) {
            if (this.$refs.dialog && !this.$refs.dialog.contains(event.target)) {
                this.$emit('close');
            }
        }
    }
}
</script>