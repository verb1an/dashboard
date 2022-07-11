<template>
    <label :for="id" class="input">
        <input 
            :id="id" 
            type="checkbox"
            :checked="modelValue"

            @change="updateInput"
        >
        <span :class="icon"></span>
    </label>
</template>

<script>
    export default {
        name: 'input-check',
        props: {
            id: {
                type: String,
                required: true
            },
            checkAll: {
                type: Boolean,
                required: false,
                default: false
            },
            modelValue: {
                type: Boolean,
                required: false
            },
            icon: {
                type: String,
                required: true
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.checked);
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.input{
    position: relative;
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: 2px solid #C5C3D6;
    border-radius: 4px;
    transition: .12s;
    transform-origin: center;

    input{
        display: none;

        &[type="checkbox"]:checked ~ span{
            opacity: 1;
        }
    }

    span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 110%;
        height: 110%;
        font-size: 11px;
        border-radius: 4px;
        transition: .12s;
        background-color: vars.$blue-color;
        color: vars.$white-color;
        opacity: 0;

        &.i-minus{
            padding-top: 2px;
            font-size: 3px;
        }
    }

    &:active{
        transform: scale(0.95);
    }

}
</style>