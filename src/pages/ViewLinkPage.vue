<template>
    <div class="wrapper">
        <div class="item__info">
            <btn-edit @click="clear" class="dark">Сбросить</btn-edit>
            <div class="line">
                <span>Name</span>
                <h2 class="name">{{ item.name }}</h2>
            </div>

            <div class="line">
                <span>ID</span>
                <h2 class="name">{{ item.id }}</h2>
            </div>

            <div class="line">
                <input-select 
                    :options="links" 
                    :modelValue="add.parent" 
                    :label="'Parent'"
                    v-model="add.parent"
                />
            </div>

            <div class="line" v-if="item.link.substring(0, 4) === 'http'">
                <input-valid 
                    :type="'text'" 
                    :label="'Element'"
                    :modelValue="add.link"
                    v-model="add.link"
                />
            </div>

            <div class="line" v-else>
                <input-select 
                    :options="[{value: item.link, name: item.link}]"
                    :label="'Link element'"
                    :modelValue="add.link"
                    v-model="add.link"
                />
            </div>
            <div class="line">
                <input-select 
                    :name="'select-status'"
                    :options="[{value: 'active', name: 'Активна'},{value: 'archived', name: 'В архиве'},{value: 'deleted', name: 'Удалена'}]"
                    :label="'Status'"

                    v-model="add.status"
                />
            </div>

            <btn-def @click="updateLink">Сохранить</btn-def>
            
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
data() {
    return {
        linkId: this.$route.params.id,
        item: {
            id: 0,
            name: '',
            parent: 0,
            link: '',
            status: '',
            sub: 0,
            children: ''
        },
        add: {
            id: 0,
            parent: 0,
            link: '',
            status: ''
        },
        links: [],
        sendUrl: '//f0664869.xsph.ru/dashboard/getlinks.php'
    }
},
methods: {
    async getItem() {
        try{
            const response = await axios.get(this.sendUrl, {
                params: {
                    linkbyid: this.linkId
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
                }
            });
            if(response.data.id) {
                this.item = response.data;
                this.add = {
                    id: this.item.id,
                    parent: this.item.parent,
                    link: this.item.link,
                    status: this.item.status
                };
            }else if(response.data.type == 'message' || response.data.type == 'error'  ) {
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
    async getParentItems() {
        try{
            const response = await axios.get(this.sendUrl, {
                params: {
                    links: 'all', search: '', sort: '', direct: ''
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
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
    async updateLink() {
        let form = new FormData();
        form.append('update', JSON.stringify(this.add));
        const headers  = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        }
        try{
            const response = await axios.post(this.sendUrl, form, headers);
            if( response.data.type == 'message' || response.data.type == 'error' ) {
                this.$emit('dialog:open', response.data);
                this.getItem();
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
    collectLinks(loadArray) {
        let array = [];
        loadArray.forEach((el) => {
            if(el.status != 'deleted') {
                array.push({
                    value: el.id,
                    name: el.name,
                    sub: el.sub,
                    parent: el.parent
                });
            }
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
    clear() {
        this.add = {
            id: this.item.id,
            parent: this.item.parent,
            link: this.item.link,
            status: this.item.status
        };
    }
},
mounted() {
    this.getItem();
    this.getParentItems();
}
}
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.wrapper{
    padding: 20px;
}

.item__info{
    max-width: 600px;

    .line{
        margin-bottom: 30px;
        span{
            font-size: 17px;
            font-weight: 600;
            color: vars.$dark-color;
            opacity: 0.6;
            letter-spacing: 1%;
            margin-bottom: 10px;
        }
        .name{
            display: block;
            font-size: 24px;
            color: vars.$dark-color;
        }
    }

    .btn{
        margin: 40px 0;

        &.btn--edit{
            font-size: 16px;
            margin-top: 0;
        }
    }
}
</style>