<template>
    <div v-if="manager.overlay" class="fixed min-h-screen min-w-full z-10 bg-opacity-50 bg-black top-0 left-0">
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useManagerStore } from '../stores/manager';
export default {
    name: 'bgOverlay',
    data(){

    },
    computed: {
        ...mapState(useManagerStore, ['manager'])
    }
}
</script>