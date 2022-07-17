<template>
<transition name="window-modal">
    <div class="modal" v-if="show">
        <slot></slot>
    </div>
</transition>
</template>

<script>
    export default {
        name: 'modal-window',
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        methods: {
            windowClose() {
                this.$emit('modal:close');
            }
        },
        mounted() {
            document.addEventListener('click', (event) => {
                if( !event.target.closest('.modal') && !event.target.closest('.btn') ) {
                    this.$emit('modal:close');
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
.modal{
    padding: 20px;
}
.window-modal-enter-active, .window-modal-leave-active {
    transition: 0.3s ease;
}
.window-modal-enter-from,.window-modal-leave-to {
    opacity: 0; 
    transform: translate(15px, 0) scale(0.95);
}
</style>