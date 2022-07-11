<template>
    <div class="wrapper">
        <h1 class="title">Add a new element</h1>
        <div class="form">
            <input-valid
                :type="'text'"
                :name="'addname'"
                :label="'Link name'"

                v-model="add.name"
            />
            <input-select 
                :name="'select-parent'"
                :label="'Select link Parent'"
                :options="links"
                :class="'mb20'"

                v-model="add.parent"
            />
            <input-select 
                :name="'select-type'"
                :options="[{value: 0, name: 'Ссылка на пост'}, {value: 1, name: 'Обычная ссылка'}]"
                :label="'Link type'"
                :class="'mb20'"

                v-model="linkstype"
            />
            <input-select 
                v-if="linkstype == 0"
                :name="'select-post'"
                :label="'Select Post'"
                :options="[]"
                :class="'mb20'"

                v-model="add.link"
            />
            <input-valid
                v-else
                :type="'text'"
                :name="'addname'"
                :label="'Reference'"
                :placeholder="'https://example.com'"

                v-model="add.link"
            />
            <input-select 
                :name="'select-status'"
                :options="[{value: 'active', name: 'Активна'},{value: 'archived', name: 'В архиве'}]"
                :label="'Select status'"
                :class="'mb20'"

                v-model="add.status"
            />
            <btn-def
                @click="addNewLink"
            >
                Сохранить
            </btn-def>
        </div>
    </div>
    
    <transition name="message-window" appear>
        <message-window 
            v-if="message.show"
            :type="message.type"
            :title="message.title" 
            :message="message.text"

            @closewindow:redirect="closeAndRed"
            @closewindow:stay="closeOnly"
        />
    </transition>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                links: [],
                linkstype: 0,

                add: {
                    name: '',
                    parent: 0,
                    link: '',
                    status: 'active'
                },

                message: {
                    show: false,
                    type: '',
                    title: '',
                    text: ''
                }
            }
        },
       methods: {
            async getItems() {
                 try{
                    const response = await axios.get('http://localhost/sibup/dashboard/server/getlinks.php', {
                        params: {
                            links: 'all', search: '', sort: '', direct: ''
                        }
                    }); 
                    this.collectLinks(response.data);
                    
                }catch(e) {
                    console.log('Ошибка - ' + e);
                }
            },
            collectLinks(loadArray) {
                let array = [];
                loadArray.forEach((el) => {
                    array.push({
                        value: el.id,
                        name: el.name,
                        sub: el.sub,
                        parent: el.parent
                    });
                });
                let mArr = [];

                array.forEach((el) => {
                    if(el.parent == 0) {
                        mArr.push(el);
                    }
                });

                for(let i = 1; i <= 3; i++) {
                    array.forEach((el) => {
                        if(el.sub == i) {
                            let index = mArr.findIndex(eli => eli.value == el.parent);
                            index+=1;
                            

                            mArr.splice(index, 0, el );
                        }
                    });
                }

                mArr.forEach((el) => {
                    let sub = '';
                    for(let i = 0; i < el.sub; i++) {
                        sub += '-';
                    }
                    el.name = sub + ' ' + el.name;
                });
                
                mArr.splice(0, 0, {
                    value: 0,
                    name: 'None',
                    sub: 0,
                    parent: 0
                });

                this.links = mArr;

            },
            async addNewLink() {
                let form = new FormData();
                form.append('add', JSON.stringify(this.add));
                const headers  = {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                }
                const url = 'http://localhost/sibup/dashboard/server/getlinks.php'
                try{
                    const response = await axios.post(url, form, headers );
                    if( response.data.type == 'message' || response.data.type == 'error' ) {
                        this.setMessageInfo(true, response.data.type, response.data.title, response.data.text);
                    }
                }catch(e) {
                    this.setMessageInfo(true, 'error', 'Неизвестная ошибка!', e);
                }
            },

            setMessageInfo(show, type, title, text) {
                this.message.show = show; 
                this.message.type = type;
                this.message.title = title;
                this.message.text = text;
            },

            closeAndRed() {
                this.setMessageInfo(false, '', '', '');
                this.$router.push('/links');
            },
            closeOnly() {
                this.setMessageInfo(false, '', '!', '');
            }
        },
        mounted() {
            this.getItems();
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.wrapper{
    padding: 20px;
    .title{
        color: vars.$dark-color;
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        margin-bottom: 40px;
    }

    .form{
        max-width: 600px;
    }
}
.message-window-enter-active, .message-window-leave-active {
    transition: 0.3s ease;
}
.message-window-enter-from.popap__message,.message-window-leave-to.popap__message {
    opacity: 0; 
    transform: translate(-50%, -15px) scale(0.95);
}

</style>