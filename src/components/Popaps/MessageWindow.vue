<template>
    <div class="popap popap__message" :class="type">
        <h3 class="title">{{ title }}</h3>
        <div class="text">
            <p>{{ message }}</p>
        </div>
        <btn-def @click="closeWindow">OK</btn-def>
    </div>
</template>

<script>
    export default {
        name: 'message-window',
        props: {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: false
            },
            type: {
                type: String, 
                rquired: false
            }
        },
        methods: {
            closeWindow() {
                if(this.type == 'message') {
                    this.$emit('closewindow:redirect');
                }else{
                    this.$emit('closewindow:stay');
                }
                
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
</style>