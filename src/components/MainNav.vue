<template>
    <nav class="nav">
        <ul class="nav__list">
            <menu-item :link="'/'" :class="$route.path == '/' ? 'current' : ''">
                <div class="item__icon">
                    <span class="i-home"></span>
                </div>
                <span>Home</span>
            </menu-item>
            <menu-item :link="'/links'" :class="$route.path == '/links' ? 'current' : ''">
                <div class="item__icon">
                    <span class="i-link"></span>
                </div>
                <span>Links</span>
            </menu-item>

            {{  }}
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'main-nav'
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.nav{

    background-color: vars.$white-color;
    width: 160px;
    min-width: 160px;

    .nav__list{
        list-style: none;
        padding: 0;

        display: flex;
        flex-direction: column;
        align-items: start;
    }
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
}
</style>