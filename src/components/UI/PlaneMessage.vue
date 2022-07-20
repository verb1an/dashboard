<template>
    <div>
        <h4 class="plane__message">
            {{ text }}
        </h4>
    </div>
</template>

<script>
    export default {
        name: 'plane-message',
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
.plane__message{
    font-size: 20px;
    font-weight: 400;
    margin: 40px 20px;
    text-align: center;
}
</style>