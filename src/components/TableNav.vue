<template>
    <div class="page__navigation">
        <btn-page @click="setPage('dec')" v-if="page>1" style="transform: rotateZ(180deg); padding-right: 1px;">
            <span class="i-chevron"></span>
        </btn-page>
        <btn-page 
            @return:value="setPage"
            v-for="vPage in vPages"
            :key="vPage"
            :value="vPage"
            :class="vPage == page ? 'current' : ''"
        >{{vPage}}</btn-page>
        <btn-page @click="setPage('inc')" v-if="page < vPages.length" style="transform: rotateZ(0); padding-left: 8px;">
            <span class="i-chevron"></span>
        </btn-page>
    </div>
</template>

<script>
    export default {
        name: 'table-nav',
        data() {
            return{
                curPage: this.page 
            }
        },
        props: {
            vPages: {
                type: Array,
                required: true
            },
            page: {
                type: Number,
                required: true
            }
        },
        methods: {
            setPage(value) {
                let returnValue = 0;
                if(value === 'inc') {
                    returnValue = Number.parseInt(this.page) + 1;
                }else if( value === 'dec' ) {
                    returnValue = Number.parseInt(this.page) - 1;
                }else{
                    returnValue = value;
                }
                this.$emit('set:page', returnValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
.page__navigation{
    display: flex;
    align-items: center;
    padding: 20px;

    .btn{
        & + .btn{
            margin-left: 10px;
        }
    }
}
</style>