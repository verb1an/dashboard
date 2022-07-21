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
    <board-search 
        :link="'/links/add'" 
        @searchQuery="updateSearch" 
        :searchValue="searchQuery" 
        :limitValue="limit"
        @updateLimit="updateLimit"
    />
    <table class="table">
        <transition name="table-items" appear>
            <tbody class="tbody">
                <tr>
                    <th>
                        <input-check :id="'check__all'" :checkAll="true" :icon="'i-minus'" v-model="checkAll" @change="changeAllItems"  />
                    </th>
                    <th class="current">
                        <span @click="updateSortParam" data-sort="id">Id</span>
                        <a @click="updateDirectParam"><span class="i-arrow"></span></a>
                    </th>
                    <th>
                        <span @click="updateSortParam" data-sort="name">Name</span>
                        <a @click="updateDirectParam"><span class="i-arrow"></span></a>
                    </th>
                    <th>
                        <span @click="updateSortParam" data-sort="status">Status</span>
                        <a @click="updateDirectParam"><span class="i-arrow"></span></a>
                    </th>
                    <th>
                        <span @click="updateSortParam" data-sort="parent">Parent</span>
                        <a @click="updateDirectParam"><span class="i-arrow"></span></a>
                    </th>
                </tr>
                <transition-group name="table-tr" appear>
                    <tr v-for="link in links" :key="link.id" :data-id="link.id">
                        <td class="td__check">
                            <input-check :icon="'i-check'" class="check__link" @change="selectItem" />
                        </td>
                        <td @click="$router.push('/links/' + link.id)" class="td__link">#id-{{ link.id }}</td>
                        <td @click="$router.push('/links/' + link.id)" class="td__link">{{ link.name }}</td>
                        <td class="td__status" :class="link.status">{{ link.status }}</td>
                        <td>{{ link.parent }}</td>
                        <td class="td__quiks">
                            <btn-icn 
                                :icon="'i-more'"
                                @click="openQuickActionsMenu"
                            />
                        </td>
                    </tr>
                </transition-group>

                <div class="quick-action__wrapper">
                    <modal-window 
                        :show="quickActionItem"
                        @modal:close="quickActionItem = 0"
                        style="padding: 0 10px"
                    >
                        <quick-action 
                            :item="quickActionItem"
                            @dialog:open="openDialog"
                            @modal:close="quickActionItem = 0"
                        />
                    </modal-window>
                </div>
            </tbody>
        </transition>
    </table>

    <plane-message 
        v-if="links.length == 0" 
        :text="'Не найдено ни одного элемента...'" 
        class="no-items-found" 
    />

    <!-- * Лоадер -->
    <board-loader 
        :show="showLoad"
    />
</div>

<table-nav
    v-if="viewedPages.length > 1"
    :vPages="viewedPages"
    :page="page"
    @set:page="setPage"
/>

<items-menu 
    :show="showItemsMenu"
    :count="selected.length"
    @removeall="changeAllItems(false)"

    :edit="selected[0]"
    :selected="selected"
    :currentStatus="currentSelectedItemStatus"

    @dialog:open="openDialog"
/>
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
            sendUrl: '//f0664869.xsph.ru/dashboard/getlinks.php',

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
            trashItems: 0,

            currentSelectedItemStatus: '',

            quickActionItem: 0,
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
                const response = await axios.get(this.sendUrl, {
                    params: {
                        links: this.getParam,
                        search: this.searchQuery,
                        sort: this.sortParam,
                        direct: this.directParam,

                        page: this.page,
                        limit: this.limit
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
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
                this.selected.splice(delItem, 1);
                item.classList.remove('selected');
            }

            if(this.selected.length == 1) {
                this.links.forEach((el) => {
                    if(el.id == this.selected[0]) {
                        this.currentSelectedItemStatus = el.status;
                        return;
                    }
                });
            }else{
                this.currentSelectedItemStatus = '';
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
        updateLimit(value) {
            this.page = 1;
            this.limit = value;
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
        },
        openDialog(data) {
            this.$emit('dialog:open', data);
            this.getItems();
        },
        openQuickActionsMenu(event) {
            const item = event.target.classList.contains('btn') ? event.target : event.target.parentNode;
            const parent = item.parentNode.parentNode;
            const topPos = Math.floor(parent.offsetTop) - 65;
            document.querySelector('.tbody').style = `--topPos: ${topPos}px`;
            this.quickActionItem = parent.getAttribute('data-id');
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
        position: relative;
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
                    position: relative;
                    padding-right: 10px;
                    text-align: right;
                    display: flex;
                    justify-content: end;
                }

                &.td__status{
                    display: flex;
                    align-items: center;
                    &::before{
                        content: '';
                        display: block;
                        width: 12px;
                        height: 12px;
                        margin-right: 6px;
                        border-radius: 50%;
                    }
                    &.active::before{
                        background-color: vars.$green-color;
                    }
                    &.archived::before{
                        background-color: vars.$yellow-color;
                    }
                    &.deleted::before{
                        background-color: vars.$red-color;
                    }
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
                    
                    span{
                        color: vars.$blue-color;
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
        .quick-action__wrapper{
            position: absolute;
            top: var(--topPos);
            right: 0;
            transform: translate(0, 100%);
            z-index: 100;
            transition: .12s;
        }
    }
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
</style>