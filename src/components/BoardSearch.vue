<template>
    <div class="search__block">
        <div class="left--col">
            <input-search 
                class="table__search"
                :placeholder="'Search...'"

                :value="searchValue"
                @input="updateSearch"
            />
            <btn-icn :icon="'i-filters'" @click="viewModalLimit = !viewModalLimit"/>

            <div class="modal__wrapper">
                <modal-limit 
                    :show="viewModalLimit"
                    @modal:close="viewModalLimit = false"
                    :limitValue="limitValue"
                    @updateLimit="updateLimit"
                />

            </div>
        </div>
        <div class="right--col">
            <btn-def @click="$router.push(link)">Create New +</btn-def>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'board-search',
        data() {
            return {
                viewModalLimit: false
            }
        },
        props: {
            link: {
                type: String,
                required: true
            },
            searchValue: {
                type: String,
                required: false
            },
            limitValue: {
                type: Number,
                required: true
            }
        },
        methods: {
            updateSearch(event) {
                this.$emit('searchQuery', event.target.value)
            },
            updateLimit(limit) {
                this.viewModalLimit = false;
                this.$emit('updateLimit', limit);
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.search__block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 10px;

    .left--col{
        position: relative;
        display: flex;
        align-items: center;

        .modal__wrapper{
            position: absolute;
            bottom: -5px;
            right: 0;
            transform: translate(0, 100%);
            background-color: transparent;
            z-index: 100;
        }
    }

    .table__search{
        margin-right: 10px;
    }
}
</style>