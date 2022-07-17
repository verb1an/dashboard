<template>
    <button class="btn btn--icn">
        <span :class="icon"></span>
    </button>
</template>

<script>
    export default {
        name: 'btn-icn',
        props: {
            icon: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss">
@use '@/scss/vars';
.btn--icn{
    padding: 4px;
    transition: .12s;
    transform-origin: center;
    svg{
        fill: vars.$dark-color;
        path, rect, circle{
            transition: 0.12s;
            opacity: 0.7;
        } 
    }
    span{
        height: 20px;
        display: block;
        color: vars.$dark-color;
        opacity: 0.7;
        font-size: 20px;
        transition: 0.12s;
        transform-origin: center;
    }

    &.icon--white{
        span{
            color: vars.$white-color;
        }
    }

    &:hover{
        svg{
            opacity: 1;
            path, rect, circle{
                opacity: 1;
            }
        }
        span{
            opacity: 1;
        }
    }
    &:active{
        span{
            transform: scale(0.95);
        }
    }
}
</style>