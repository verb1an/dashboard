<template>
    <button 
        :data-value="value"
        @click="returnValue"

        type="button"
        class="btn btn--page" 
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'btn-page',
        props: {
            value: {
                type: [Number, String],
                required: false
            }
        },
        methods: {
            returnValue(event) {
                this.$emit('return:value', event.target.getAttribute('data-value'));
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.btn{
    &.btn--page{
        width: 50px;
        height: 50px;
        border: 2px solid vars.$dark-color-05;
        color: vars.$dark-color-075;
        fill: vars.$dark-color-075;
        border-radius: 4px;

        font-size: 24px;
        font-weight: 600;

        transition: .24s;

        display: flex;
        align-items: center;
        justify-content: center;

        transform-origin: center;


        &.current{
            border: 2px solid vars.$blue-color;
            color: vars.$blue-color;
        }

        &:hover{
            background: vars.$dark-color-02;
        }

        &:active{
            transform: scale(0.95);
        }
    }
}
</style>