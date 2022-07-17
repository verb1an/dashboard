<template>
    <div class="wrapper">
        <div class="tabs">
            <btn-tab 
                :icon="'i-layout-list'"
                :count="totalItems"
                :class="getParam == 'all' ? 'current' : '' "
                @click="setTab('all')"
            >All</btn-tab>
            <btn-tab 
                :icon="'i-stopwatch'"
                :count="archiveItems"
                :class="getParam == 'archived' ? 'current' : '' "
                @click="setTab('archived')"
            >Archive</btn-tab>
            <btn-tab 
                :icon="'i-trash'" 
                :count="trashItems"
                :class="getParam == 'deleted' ? 'current' : '' "
                @click="setTab('deleted')"
            >Trash</btn-tab>
        </div>
        <board-search :link="'/links/add'" @searchQuery="updateSearch" :searchValue="searchQuery" />
        <table class="table">
            <transition name="table-items" appear>
                <tbody class="tbody">
                    <tr>
                        <th>
                            <input-check :id="'check__all'" :checkAll="true" :icon="'i-minus'" v-model="checkAll" @change="changeAllItems"  />
                        </th>
                        <th class="current">
                            <span @click="updateSortParam" data-sort="id">Id</span>
                            <a @click="updateDirectParam"><svg width="12" height="17" viewBox="0 0 12 17" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.65697 0L6.65697 1.74846e-07L6.65697 12.8283L9.8995 9.58579L11.3137 11L5.65685 16.6569L0 11L1.41421 9.58579L4.65697 12.8285L4.65697 0Z"/>
                            </svg></a>
                        </th>
                        <th>
                            <span @click="updateSortParam" data-sort="name">Name</span>
                            <a @click="updateDirectParam"><svg width="12" height="17" viewBox="0 0 12 17" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.65697 0L6.65697 1.74846e-07L6.65697 12.8283L9.8995 9.58579L11.3137 11L5.65685 16.6569L0 11L1.41421 9.58579L4.65697 12.8285L4.65697 0Z"/>
                            </svg></a>
                        </th>
                        <th>
                            <span @click="updateSortParam" data-sort="status">Status</span>
                            <a @click="updateDirectParam"><svg width="12" height="17" viewBox="0 0 12 17" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.65697 0L6.65697 1.74846e-07L6.65697 12.8283L9.8995 9.58579L11.3137 11L5.65685 16.6569L0 11L1.41421 9.58579L4.65697 12.8285L4.65697 0Z"/>
                            </svg></a>
                        </th>
                        <th>
                            <span @click="updateSortParam" data-sort="parent">Parent</span>
                            <a @click="updateDirectParam"><svg width="12" height="17" viewBox="0 0 12 17" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.65697 0L6.65697 1.74846e-07L6.65697 12.8283L9.8995 9.58579L11.3137 11L5.65685 16.6569L0 11L1.41421 9.58579L4.65697 12.8285L4.65697 0Z"/>
                            </svg></a>
                        </th>
                    </tr>
                    <transition-group name="table-tr" appear>
                        <tr v-for="link in links" :key="link.id" :data-id="link.id">
                            <td class="td__check">
                                <input-check :icon="'i-check'" class="check__link" @change="selectItem" />
                            </td>
                            <td @click="$router.push('/links/' + link.id)" class="td__link">#id-{{ link.id }}</td>
                            <td @click="$router.push('/links/' + link.id)" class="td__link">{{ link.name }}</td>
                            <td>{{ link.status }}</td>
                            <td>{{ link.parent }}</td>
                            <td class="td__quiks">
                                <btn-icn :icon="'i-more'" />
                            </td>
                        </tr>
                    </transition-group>
                </tbody>
            </transition>
        </table>
        <h4 class="plane__message no-items-found" v-if="links.length == 0">
            Не найдено ни одного элемента...
        </h4>

        <!-- * Лоадер -->
        <div v-if="showLoad" class="lds-ellipsis">
            <div></div><div></div><div></div><div></div>
        </div>
    </div>

    <table-nav
        v-if="viewedPages.length > 1"
        :vPages="viewedPages"
        :page="page"
        @set:page="setPage"
    />

    <transition name="menu-items">
        <items-menu 
            v-if="showItemsMenu"
            :count="selected.length"
            @removeall="changeAllItems(false)"

            :edit="selected[0]"
            :toArchive="selected"
            :toTrash="selected"
        />
    </transition>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            showItemsMenu: false,
            showLoad: false,
            links: [],
            selected: [],

            checkAll: false,

            getParam: 'all',
            searchQuery: '',
            sortParam: 'id',
            directParam: '',

            viewedPages: [],
            page: 1,
            limit: 8,
            totalPages: 0,

            totalItems: 0,
            archiveItems: 0,
            trashItems: 0
        }
    },
    props: {
        showTable: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    methods: {
        async getItems() {
            this.links = [];
            this.changeAllItems(false);
            this.showLoad = true;
            try {
                const response = await axios.get('http://localhost/sibup/dashboard/server/getlinks.php?', {
                    params: {
                        links: this.getParam,
                        search: this.searchQuery,
                        sort: this.sortParam,
                        direct: this.directParam,

                        page: this.page,
                        limit: this.limit
                    }
                }); 
                if(typeof response.data == 'object' && !response.data.type) {
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit );
                    this.totalItems = response.headers['x-total-all'];
                    this.archiveItems = response.headers['x-total-archive'];
                    this.trashItems = response.headers['x-total-trash'];
                    this.links = response.data;
                    this.generatePageNavigation();
                }
                
            }catch(e) {
                this.$emit('dialog:open', {
                    type: 'error',
                    title: 'Неизвестная ошибка',
                    text: e,
                    redirect: false
                });
            } finally {
                this.showLoad = false;
            }
        },

        selectItem(event) {
            this.editSelectedList(event.target);
            this.showItemsMenuChecking();
        },
        changeAllItems() {
            // <!-- ? JS realization
            if ( typeof arguments[0] === 'boolean') this.checkAll = arguments[0];
            document.querySelectorAll('.check__link input[type=checkbox]').forEach((inp) => {
                inp.checked = this.checkAll;
                this.editSelectedList(inp);
            });
            this.showItemsMenuChecking();

        },
        editSelectedList(input) {
            /* 
            <!-- ? input -> label -> td -> tr (td has attr id)
            <!-- ? Assumed that id will be unique
            */
            const item = input.parentNode.parentNode.parentNode;
            const itemId = item.getAttribute('data-id');
            if(input.checked) {
                this.selected.push(itemId);
                item.classList.add('selected');
            }else{
                let delItem = this.selected.indexOf(itemId);
                this.selected.splice(delItem, delItem+1);
                item.classList.remove('selected');
            }
        },
        showItemsMenuChecking() {
            // <!-- ? Check array selected has elements
            document.querySelector('#check__all').checked = this.selected.length > 0;
            this.showItemsMenu = this.selected.length > 0;
        },

        updateSearch(value) {
            this.searchQuery = value;
            this.getItems();
        },
        updateSortParam(event) {
            document.querySelectorAll('.table .tbody tr th').forEach(el => el.classList.remove('current'));
            event.target.parentNode.classList.add('current');
            this.sortParam = event.target.getAttribute('data-sort');
            this.getItems();
        },
        updateDirectParam(event) {
            event.preventDefault();
            if(this.directParam === 'desc') {
                this.directParam = ''
                document.querySelectorAll('.table .tbody tr th a').forEach(el => el.classList.remove('top'));
            }else{
                this.directParam = 'desc';
                document.querySelectorAll('.table .tbody tr th a').forEach(el => el.classList.add('top'));
            }
            this.getItems();
        },

        generatePageNavigation() {
            this.viewedPages = [];
            for(let i = (this.page-2); i <= (this.page+2); i++) {
                if( i > 0 && i <= this.totalPages ) this.viewedPages.push(i);
            }
        },

        setPage(value) {
            this.page = value;
            this.getItems();
        },

        setTab(value) {
            this.getParam = value;
            this.getItems();
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
    position: relative;
    min-height: 725px;
}

.tabs{
    background-color: vars.$light-gray-color;
    display: flex;
    align-items: center;
}

.table{
    width: 100%;
    .tbody{
        width: 100%;
        tr{
            position: relative;
            display: grid;
            grid-template-columns: 40px 250px 400px 250px 100px auto;
            text-align: left;

            td, th{
                display: block;
                padding: 20px 50px 20px 10px;
                width: 100%;
                cursor: pointer;
                &.td__link{
                    &::before{
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: -1px;
                        height: 0;
                        transform: translateY(-50%);
                        width: 2px;
                        background-color: vars.$dark-color-05;
                        transition: 0.12s;
                    }
                    &:hover{
                        &::before{
                            height: 100%;
                        }
                    }
                }

                &.td__quiks{
                    padding-right: 10px;
                    text-align: right;
                    display: flex;
                    justify-content: end;
                }
            }

            th{
                opacity: 0.5;
                transition: 0.24s;
                display: flex;
                align-items: center;

                span{
                    margin-right: 5px;
                }

                a{
                    margin-top: 4px;
                    transition: .24s;

                    opacity: 0;
                    pointer-events: none;
                    transform-origin: center;
                    
                    svg{
                        fill: vars.$blue-color;
                        pointer-events: none;
                    }

                    &.top{
                        margin-bottom: 4px;
                        margin-top: 0;
                        transform: rotateX(180deg);
                    }
                }

                &.current{
                    opacity: 1;

                    a{
                        opacity: 1;
                        pointer-events: auto;
                    }
                }

                &:first-child{
                    display: block;
                    opacity: 1;
                }
            }
            

            &:nth-child(1n+1) {
                background-color: vars.$white-color;
                
            }
            &:nth-child(2n+1) {
                background-color: vars.$light-gray-color;
            }

            &:before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                height:0;
                width: 2px;
                background-color: vars.$blue-color;
                transition: 0.12s;
            }

            &.selected{
                &:before{
                    height: 100%;
                }
            }
        }
    }
}

.plane__message{
    font-size: 20px;
    font-weight: 400;
    margin: 40px 20px;
    text-align: center;
}

.table-items-enter-active,table-items-leave-active {
    transition: 0.5s ease;
}
.table-items-enter-from, .table-items-leave-to {
    opacity: 0; 
    transform: scale(0.95);
}

.table-tr-enter-active,table-tr-leave-active {
    transition: 0.5s ease;
}
.table-tr-enter-from, .table-tr-leave-to {
    opacity: 0; 
}

.menu-items-enter-active,.menu-items-leave-active {
    transition: 0.5s ease;
    transform: translate(-50%, -40px) ;
}
.menu-items-enter-from.menu__items,.menu-items-leave-to.menu__items {
    opacity: 0;
    transform: translate(-50%, 0);
}

.lds-ellipsis {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 80px;
    height: 80px;
    div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: vars.$blue-color-05;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        &:nth-child(1) {
            left: 8px;
            animation: lds-ellipsis1 0.6s infinite;
        }
        &:nth-child(2) {
            left: 8px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(3) {
            left: 32px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(4) {
            left: 56px;
            animation: lds-ellipsis3 0.6s infinite;
        }
    }

    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(24px, 0);
        }
    }

}
</style>