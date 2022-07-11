<template>
    <div class="list__item-wrapper">
        <li class="list__item">
            <router-link :to="link" class="item__link">
                <slot></slot>
            </router-link>
        </li>
    </div>
</template>

<script>
    export default {
        name: 'menu-item',
        props: {
            link: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.list__item-wrapper{
    width: 100%;

    &.current{
        .item__link{
            opacity: 1;
            background-color: vars.$black-color-01;
        }
    }
}

.list__item{
    width: 100%;        
    .item__link{
        display: block;
        color: vars.$dark-color;
        opacity: 0.7;
        transition: 0.12s;  
        width: 100%;

        display: flex;
        align-items: center;
        font-weight: 600;

        padding: 6px 12px;
        transition: .12s;
        background-color: vars.$white-color;

        .item__icon{
            display: block;
            margin-right: 12px;
            svg, span{
                color: vars.$dark-color;
                fill: vars.$dark-color;

                width: 14px;
                height: auto;

                font-size: 14px;
            }
        }

        span{
            display: block;
        }

        &:hover{
            opacity: 1;
            background-color: vars.$black-color-01;
        }
    }

    
}
</style>