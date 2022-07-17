<template>
    <transition name="message-window" appear>
        <div class="popap popap__message" v-if="message.show" :class="message.type">
        <!--  -->
            <h3 class="title">{{ message.title }}</h3>
            <div class="text">
                <p>{{ message.text }}</p>
            </div>
            <btn-def @click="closeMessageDialog">OK</btn-def>
        </div>
    </transition>
    
</template>

<script>
    export default {
        name: 'message-window',
        props: {
            message: {
                type: Object,
                required: true
            }
        },
        methods: {
            closeMessageDialog() {
                if( this.message.redirect != 'false' ) {this.$router.push(this.message.redirect);}
                
                this.$emit('dialog:close');
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.popap__message{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background-color: vars.$white-color;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);

    color: vars.$dark-color;

    .title{
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;

        max-width: 400px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }

    .text{
        font-size: 17px;
        font-weight: 400;
        margin-bottom: 20px;
        width: 400px;
        max-width: 400px;
        max-height: 300px;
        overflow-y: auto;
    }

    .btn{
        margin-left: auto;
    }

    &.error{
        .title{
            color: vars.$red-color;
        }
    }
}
.message-window-enter-active, .message-window-leave-active {
    transition: 0.3s ease;
}
.message-window-enter-from,.message-window-leave-to {
    opacity: 0; 
    transform: translate(-50%, -15px) scale(0.95);
}
</style>