<template>
    <div class="logotype-wrapper">
        <router-link to="/" class="logotype">{{ text }}</router-link>
    </div>
</template>

<script>
    export default {
        name: 'board-logo',
        props: {
            text: {
                type: String,
                required: false,
                default: 'Dash Board'
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
@use '@/scss/mixins';

.logotype-wrapper{
    .logotype{
        @include mixins.font(24px, 700);
        text-transform: uppercase;
        letter-spacing: -1%;
    }
}
</style>