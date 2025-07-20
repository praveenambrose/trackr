<template>
    <div ref="select" tabindex="1" class="relative group flex items-center w-full my-2 border border-medium-grey/25 rounded px-4 py-3">
        <input disabled v-bind="$attrs" class="w-full cursor-pointer bg-white">
        <IconArrowDown class="group-focus:hidden"/>
        <IconArrowUp class="hidden group-focus:block" />
        <div ref="options" class="absolute left-0 top-full w-full rounded hidden group-focus:block bg-white">
            <div v-for="(item, index) in optionValue" :key="index" class="p-4 text-medium-grey text-xs font-medium hover:text-black dark:hover:text-white" @click="onClick(index, item)">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import IconArrowDown from '../icon/IconArrowDown.vue'
import IconArrowUp from '../icon/IconArrowUp.vue'
export default {
    name: 'BaseSelect',
    props: {
        optionValue: {
            type: Array,
            required: true
        }
    },
    components: {
        IconArrowDown,
        IconArrowUp
    },
    data(){
        return {}
    },
    methods: {
        onClick(index, name) {
            this.$refs.select.blur();
            this.$emit('onSelect', { index, name });
        }
    }
}
</script>