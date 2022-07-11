<template>
    <input 

        :class="dopclass"
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"

        @input="updateInput"
        
    />
</template>

<script>
    export default {
        name: 'input-def',
        props: {
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            name: {
                type: String,
                required: false
            },
            id: {
                type: String,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            modelValue: {
                type: String,
                required: false
            },
            dopclass: {
                type: String,
                required: false,
                default: 'input'
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';

input{
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    outline: none;
    border: 0;
    background-color: #F2F4F5;
    transition: 0.24s;
    font-size: 16px;
    padding: 10px 5px;

    &::placeholder{
        color: vars.$gray-color;
    }
}

</style>