<template>
    <label class="input__search">
        <input-def 
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="value"
        />
        <btn-icn :icon="'i-search'"/>
    </label>
</template>

<script>
    export default {
        name: 'input-search',
        props: {
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            name: {
                type: String,
                required: false
            },
            id: {
                type: String,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            value: {
                type: String,
                required: false
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.input__search{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    background-color: vars.$white-gray-color;
    max-width: 240px;
    border-radius: 8px;
    transition: 0.24s;
    label{
        max-width: 200px;
        font-weight: 500;
    }

    &:hover{
        box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);
    }

    &:focus{
        box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);
    }
}
</style>