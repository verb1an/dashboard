<template>
    <button class="btn btn--edit" type="button">
        <span v-if="icon" :class="icon"></span>
        <h4><slot></slot></h4>
    </button>
</template>

<script>
    export default {
        name: 'btn-edit',
        props: {
            icon: {
                type: String,
                required: false
            }
        }
    }
</script>

<style lang="scss">
@use '@/scss/vars';

.btn{
    &.btn--edit{
        position: relative;
        display: flex;
        align-items: center;
        padding: 14px;
        background-color: rgba(255, 255, 255, .1);
        color: vars.$white-color;

        font-weight: 600;
        font-size: 20px;
        border-radius: 50px;

        overflow: hidden;
        transition: .24s;

        span{
            display: block;
            color: vars.$white-color;
            margin-right: 10px;
        }

        &.dark{
            background-color: vars.$dark-color-05;
        }
        &.green{
            background-color: vars.$green-color;
        }
        &.red{
            background-color: vars.$red-color-07;
        }
        &.yellow{
            background-color: vars.$yellow-color-07;
        }

        &:before{
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border-radius: 50%;
            transition: width .24s, height .24s;
            background-color: rgba(0, 0, 0, .2);
        }
        &:hover:before{
            width: 250px;
            height: 250px;
        }
        &:active{
            transform: scale(0.95);
        }
    }
}
</style>