<template>
    <div class="search__block">
        <div class="left--col">
            <input-search 
                class="table__search"
                :placeholder="'Search...'"

                :value="searchValue"
                @input="updateSearch"
            />
            <btn-icn :icon="'i-filters'"/>
        </div>
        <div class="right--col">
            <btn-def @click="$router.push(link)">Create New +</btn-def>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'board-search',
        props: {
            link: {
                type: String,
                required: true
            },
            searchValue: {
                type: String,
                required: false
            }
        },
        methods: {
            updateSearch(event) {
                this.$emit('searchQuery', event.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
.search__block{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 10px;

    .left--col{
        display: flex;
        align-items: center;
    }

    .table__search{
        margin-right: 10px;
    }
}
</style>