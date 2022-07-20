<template>
    <transition name="menu-items">
        <div class="popap menu__items" v-if="show">
            <btn-icn 
                class="icon--white"
                @click="removeAllItems"
                :icon="'i-close'"
            />
            <h4 class="title">
                {{ count }} items selected
            </h4>
            <div class="buttons">
                <btn-edit v-if="count == 1" :icon="'i-pen'" @click="$router.push('/links/' + edit)">
                    Edit
                </btn-edit>
                <btn-edit v-if="currentStatus != 'active'" class="green" :icon="'i-check'" @click="sendQuick('active')">
                    to active
                </btn-edit>
                <btn-edit v-if="currentStatus != 'archived'" class="yellow" :icon="'i-stopwatch'" @click="sendQuick('archived')">
                    To archive
                </btn-edit>
                <btn-edit v-if="currentStatus != 'deleted'" class="red" :icon="'i-trash'" @click="sendQuick('deleted')">
                    Delete
                </btn-edit>
            </div>
        </div>

    </transition>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'items-menu',
        data() {
            return {
                sendUrl: 'http://localhost/sibup/dashboard/server/getlinks.php',
                sendHeaders: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                }
            }
        },  
        props: {
            show: {
                type: Boolean,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            edit: {
                type: Number,
                required: false
            },
            selected: {
                type: Array,
                required: false
            },
            currentStatus: {
                type: String,
                required: false
            }
        },
        methods: {
            removeAllItems() {
                this.$emit('removeall');
            },
            async sendQuick(status) {
                let form = new FormData();
                form.append('quick', JSON.stringify({
                    action: status,
                    data: this.selected
                }));
                try{
                    const response = await axios.post(this.sendUrl, form, this.sendHeaders);
                    if(response.data.type == 'message' || response.data.type == 'error' ) {
                        this.$emit('dialog:open', response.data);
                    }
                }catch(e) {
                    this.$emit('dialog:open', {
                        type: 'error',
                        title: 'Неизвестная ошибка',
                        text: e,
                        redirect: false
                    });
                }
            },
            async sendTrash() {

            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.menu__items{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -40px);
    
    padding: 15px 25px;
    border-radius: 50px;
    background-color: vars.$dark-color;
    color: vars.$white-color;

    display: flex;
    align-items: center;

    .title{
        margin-left: 10px;  
        margin-right: 100px;
    }

    .buttons{
        display: flex;
        align-items: center;

        .btn{
            margin-right: 10px;

            .icon{
                padding-top: 3px;
            }
        }
    }
}

.menu-items-enter-active,.menu-items-leave-active {
    transition: 0.3s ease;
    transform: translate(-50%, -40px) ;
}
.menu-items-enter-from.menu__items,.menu-items-leave-to.menu__items {
    opacity: 0;
    transform: translate(-50%, 0);
}
</style>