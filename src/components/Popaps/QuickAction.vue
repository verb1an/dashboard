<template>
<div class="quick__actions">
    <button @click="this.$router.push('/links/' + item)" type="button" class="btn">
        <span class="i-arrow" style="transform: rotateZ(-90deg);"></span>
        Edit
    </button>
    <button @click="sendQuick('active')" type="button" class="btn">
        <span class="i-check"></span>
        to active
    </button>
    <button @click="sendQuick('archived')" type="button" class="btn">
        <span class="i-stopwatch"></span>
        to archive
    </button>
    <button @click="sendQuick('deleted')" type="button" class="btn">
        <span class="i-trash"></span>
        delete
    </button>
</div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'quick-action',
        data() {
            return {
                sendUrl: '//f0664869.xsph.ru/getlinks.php',
                sendHeaders: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                }
            }
        }, 
        props: {
            item: {
                type: [String, Number],
                required: false
            }
        },
        methods: {
            async sendQuick(status) {
                
                let form = new FormData();
                form.append('quick', JSON.stringify({
                    action: status,
                    data: [this.item]
                }));
                try{
                    const response = await axios.post(this.sendUrl, form, this.sendHeaders);
                    if(response.data.type == 'message' || response.data.type == 'error' ) {
                        this.$emit('dialog:open', response.data);
                        this.$emit('modal:close');
                    }
                }catch(e) {
                    this.$emit('dialog:open', {
                        type: 'error',
                        title: 'Неизвестная ошибка',
                        text: e,
                        redirect: false
                    });
                    this.$emit('modal:close');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';

.quick__actions{
    background-color: vars.$white-color;
    padding: 10px;
    box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);

    .btn{
        padding: 5px;
        min-width: 140px;
        text-align: left;
        line-height: 16px;
        transition: 0.12s;

        display: flex;
        align-items: center;

        span{
            display: flex;
            align-items: center;
            justify-content: center;
            transform-origin: center;
            margin-right: 5px;
            width: 16px;
            height: 16px;
            transition: .12s;
        }

        &:hover{
            span{
                margin-right: 10px;
            }
            &:nth-child(1) span { color: vars.$blue-color }
            &:nth-child(2) span { color: vars.$green-color }
            &:nth-child(3) span { color: vars.$yellow-color }
            &:nth-child(4) span { color: vars.$red-color }
        }

        &:active{
            &:nth-child(1) { color: vars.$blue-color }
            &:nth-child(2) { color: vars.$green-color }
            &:nth-child(3) { color: vars.$yellow-color }
            &:nth-child(4) { color: vars.$red-color }
        }
    }
}
.menu-items-enter-active,.menu-items-leave-active {
    transition: 0.3s ease;
}
.menu-items-enter-from.menu__items,.menu-items-leave-to.menu__items {
    opacity: 0;
    transform: translate(0, 25px);
}
</style>