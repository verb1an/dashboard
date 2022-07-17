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
                this.$emit('dialog:open', {
                    type: 'error',
                    title: 'Неизвестная ошибка',
                    text: e,
                    redirect: false
                });
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
                    this.$emit('dialog:open', response.data);
                }

                console.log(response)
            }catch(e) {
                this.$emit('dialog:open', {
                    type: 'error',
                    title: 'Неизвестная ошибка',
                    text: e,
                    redirect: false
                });
            }
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

</style>