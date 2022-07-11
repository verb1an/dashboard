<template>
    <div class="input__select">
         <div class="pre__text">
            {{ label }}
        </div>
        <select 
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            :class="dopclass"

            @input="updateInput"
        >
            <option 
                v-for="option in options" 
                :value="option.value"
                :key="option.value"
            >{{ option.name }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'input-select',
        props: {
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
                type: [String, Number],
                required: false
            },
            label: {
                type: String,
                required: false 
            },
            dopclass: {
                type: String,
                required: false,
                default: 'select'
            },
            options: {
                type: Array,
                required: true
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value);
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.input__select{
    .pre__text{
        font-size: 17px;
        font-weight: 600;
        color: vars.$dark-color;
        opacity: 0.6;
        letter-spacing: 1%;
        margin-bottom: 10px;
    }

    select{
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

    &.mb20{
        margin-bottom: 20px;
    }
}   

</style>