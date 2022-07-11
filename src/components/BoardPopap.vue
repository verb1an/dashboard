<template>
<div class="popap">
    <slot></slot>
</div>
    
</template>

<script>
    export default {
        name: 'board-popap',
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.popap{
    position: fixed;
    // transform: translate(-50%, -50%);
}
</style>