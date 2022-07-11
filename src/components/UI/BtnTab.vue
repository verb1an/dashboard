<template>
    <button class="btn btn--tab">
        <span v-if="icon.length > 0" :class="icon"></span>
        <h3><slot></slot></h3>
        <span v-if="count" class="count">{{count}}</span>
    </button>
</template>

<script>
    export default {
        name: 'btn-tab',
        props: {
            icon: {
                type: String,
                required: false
            },
            count: {
                type: Number,
                required: false
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.btn{
    position: relative;
    padding: 16px 20px;
    background-color: vars.$white-color;
    margin-right: 25px;

    display: flex;
    align-items: center;
    color: vars.$dark-color-05;
    fill: vars.$dark-color-05;
    transition: .24s;

    span[class^="i-"] {
        font-size: 18px;
    }

    h3{
        margin: 0 15px;
        font-size: 18px;
    }

    .count{
        background-color: vars.$black-color-01;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 15px;
        transition: .24s;
    }

    &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(100%);
        width: 100%;
        height: 6px;
        background-color: vars.$white-color;
    }

    &.current{
        color: vars.$dark-color;
        fill: vars.$dark-color;
        box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);

        .count{
            color: vars.$white-color;
            background-color: vars.$blue-color;
        }
    }
}
</style>