<template>
    <div class="relative flex flex-col">
        <label :for="inputName" class="mb-2 text-medium-grey font-bold text-xs">
            {{ inputName }}
        </label>
        <textarea v-bind="$attrs" :name="inputName" :value="modelValue" rows="4" :id="inputName"
            @input="$emit('update:modelValue', $event.target.value)" class="resize-none px-4 py-2 rounded outline outline-1 outline-medium-grey/25" />
    </div>
</template>

<script>
export default {
    name: 'BaseTextArea',
    props: {
        inputName: {
            type: String,
            required: true
        },
        modelValue: String
    }
}
</script>