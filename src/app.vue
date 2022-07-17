<template>
    <div class="app-wrapper">
        <board-header />
        <main class="main">
            <div class="container">
                <div class="main__inner">
                    <main-nav></main-nav>
                    <div class="content">
                        
                        <div class="content-wrapper">
                            <router-view
                                @dialog:open="openMessageDialog"
                            ></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <message-window 
            :message="message"
            @dialog:close="closeMessageDialog"
        />

    </div>
</template>

<script>
export default {
    data() {
        return {
            message: {
                show: false,
                type: '',
                title: '',
                text: '',
                redirect: false
            }
        }
    },
    methods: {
        openMessageDialog(mess) {
            this.message = {
                type: mess.type,
                title: mess.title,
                text: mess.text,
                redirect: mess.redirect
            }
            this.message.show = true;
        },
        closeMessageDialog() {
            this.message = {
                show: false,
                type: '',
                title: '',
                text: '',
                redirect: false
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/_vars.scss';
@import '@/scss/_mixins.scss';
@import '@/scss/_null.scss';

html{
    @include font(18px, 400);
}
body{
    background-color: $light-gray-color;
}
.container{
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
}
.main{
    padding: 15px 0;

    .main__inner{
        display: flex;
        align-items: start;
        justify-content: space-between;
    }

    .content{
        width: 100%;
        margin: 0 36px;
        background-color: $white-color;
    }
}
a{
    color: $dark-color;
    @include font(18px, 400);
}
.btn{
    display: block;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: 0;
}
.input-cen{
    input{
        font-weight: 600;
        font-size: 18px;
        width: 100%;
    }
}
</style>
