<template>
    <div class="popap menu__items">
        <btn-icn 
            class="icon--white"
            @click="removeAllItems"
            :icon="'i-close'"
        />
        <h4 class="title">
            {{ count }} items selected
        </h4>
        <div class="buttons">
            <btn-edit v-if="count == 1" :icon="'i-pen'" @click="$router.push('/links/' + edit)">
                Edit
            </btn-edit>
            <btn-edit class="yellow" :icon="'i-stopwatch'" @click="sendArchive">
                To archive
            </btn-edit>
            <btn-edit class="red" :icon="'i-trash'">
                Delete
            </btn-edit>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'items-menu',
        props: {
            count: {
                type: Number,
                required: true
            },
            edit: {
                type: Number,
                required: false
            },
            toArchive: {
                type: Array,
                required: false
            },
            toTrash: {
                type: Array,
                required: false
            }
        },
        methods: {
            removeAllItems() {
                this.$emit('removeall');
            },
            async sendArchive() {
                console.log('123');
            },
            async sendTrash() {

            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.menu__items{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -40px);
    
    padding: 15px 25px;
    border-radius: 50px;
    background-color: vars.$dark-color;
    color: vars.$white-color;

    display: flex;
    align-items: center;

    .title{
        margin-left: 10px;  
        margin-right: 100px;
    }

    .buttons{
        display: flex;
        align-items: center;

        .btn{
            margin-right: 10px;

            .icon{
                padding-top: 3px;
            }
        }
    }
}
</style>