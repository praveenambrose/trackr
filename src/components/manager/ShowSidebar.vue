<template>
    <button class="bg-main-purple text-white rounded-r-full px-4 py-1 fixed bottom-10 left-0" @click="manager.sidebar = true">
        <i class="mdi mdi-eye text-xl"></i>
    </button>
</template>

<script>
import { mapState } from 'pinia';
import { useManagerStore } from '../../stores/manager';
import IconShowSidebar from '../icon/IconShowSidebar.vue';
export default {
    name: 'ShowSidebar',
    components: {
        IconShowSidebar
    },
    computed: {
        ...mapState(useManagerStore, ['manager'])
    }
}
</script>