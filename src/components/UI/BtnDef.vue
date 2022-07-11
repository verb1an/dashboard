<template>
    <button @mousemove="btnHover" class="btn btn--def" type="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'btn-def',
        methods: {
            btnHover(e) {
                /*
                    <!-- ? polyfill to determine the mouse cursor position and set the pageX/Y value
                    <!-- ? Copied from internet
                    <!-- 
                    * Фактически означает: 
                    * Если значение pageX/Y отсутствует, то pageX/Y присваевается 
                    * значение позиции курсора относительно видимой области
                    * + проскролленой части(если она существует, иначе +0)
                    -->
                */
                if (e.pageX == null && e.clientX != null) {
                    const html = document.documentElement;
                    const body = document.body;

                    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
                    e.pageX -= html.clientLeft || 0;

                    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
                    e.pageY -= html.clientTop || 0;
                }

                // <!-- ? Mouse cursor position - element position
                let posX = Math.floor(e.pageX - e.target.getBoundingClientRect().left);
                let posY = Math.floor(e.pageY - e.target.getBoundingClientRect().top );

                e.target.style = `
                    --posx: ${posX}px;
                    --posy: ${posY}px;
                `;
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';

.btn{
    &.btn--def{
        position: relative;
        display: block;
        padding: 8px 34px;
        background-color: vars.$blue-color-05;
        color: vars.$white-color;

        font-weight: 600;
        font-size: 20px;
        border-radius: 8px;

        overflow: hidden;
        transition: .24s;

        &:before{
            content: '';
            position: absolute;
            top: var(--posy);
            left: var(--posx);
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border-radius: 50%;
            transition: width .24s, height .24s;
            background-color: rgba(0, 0, 0, .2);
        }
        &:hover:before{
            width: 500px;
            height: 500px;
        }
        &:active{
            transform: scale(0.95);
        }
    }
}
</style>