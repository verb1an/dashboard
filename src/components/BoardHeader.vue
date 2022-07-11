<template>
    <div class="header">
        <div class="container">
            <div class="header__inner">
                <board-logo :text="'dash board'" />
                <div class="right--col">
                    <input-search
                        :placeholder="'Search from all...'"
                    />
                    <div class="header__buttons">
                        <btn-icn :icon="'i-notifications'"/>
                        <btn-icn :icon="'i-menu-right'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'board-header'
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
@use '@/scss/mixins';
.header{
    padding: 16px 5px;
    background-color: vars.$white-color;

    .header__inner{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header__buttons{
        display: flex;
        align-items: center;
    }

    .right--col{
        display: flex;
        align-items: center;

        .input__search{
            margin-right: 100px;
        }
    }
}
</style>