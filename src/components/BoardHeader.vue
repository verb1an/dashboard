<template>
    <div class="header">
        <div class="container">
            <div class="header__inner">

                <div class="left--col">
                    <board-logo :text="'dash board'" />
                    <btn-edit v-if="$route.path != '/'" @click="backLink" class="dark">
                        <span class="i-arrow"></span>
                    </btn-edit>
                </div>
                
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
        name: 'board-header',
        methods: {
            backLink() {
                let back = this.$route.path.substring(1, this.$route.path.length).split('/');
                if(back[0] != '') {
                    let forward = '/';
                    for(let i = 0; i < (back.length-1); i++) forward += back[i];
                    this.$router.push(forward);
                }
            }
        }
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

    .left--col{
        display: flex;
        align-items: center;

        .btn--edit{
            padding: 10px;
            opacity: 0.7;
            margin-left: 40px;

            span{
                font-size: 17px;
                width: 17px;
                margin-right: 0; 
                transform: rotateZ(90deg);
            }
        }
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