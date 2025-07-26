<template>
    <button
        type="button"
        v-bind="$attrs"
        :class="[
            'bg-main-purple w-full rounded-full py-3 px-4 text-white text-sm font-bold',
            { 'opacity-50 cursor-not-allowed': $attrs.disabled }
        ]"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'AddButton'
}
</script>