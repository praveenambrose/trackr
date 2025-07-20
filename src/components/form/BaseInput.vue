<template>
    <div class="relative flex flex-col my-2">
        <label :for="InputName" class="text-medium-grey text-xs font-bold mb-2">
            <slot></slot>
        </label>
        <input v-bind="$attrs" :value="modelValue" :id="InputName" class="px-4 py-2 rounded outline outline-1 outline-medium-grey/25 cursor-pointer"
             @input="onInput($event)"
        >
        <p v-if="error" class="absolute right-4 bottom-2 text-red text-xs">
            Can't be empty
        </p>
    </div>
</template>

<script>
export default {
    name: 'BaseInput',
    props: {
        InputName: {
            type: String
        },
        modelValue: String,
        isRequired: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        error: false
    }),
    methods: {
        onInput(event) {
            if(this.isRequired && event.target.value.trim() === '') {
                this.error = true;
                this.$emit('update:modelValue', event.target.value)
            } else {
                this.error = false;
                this.$emit('update:modelValue', event.target.value)
            }
        }
    },
}
</script>