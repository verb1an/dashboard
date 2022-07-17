<template>
    <modal-window 
        class="modal__limit" 
        :show="show"
    >
        <h3>Set a limit</h3>
        <input-select 
            :options="limitOptions"
            :modelValue="limitValue"
            class="input__limit"
            @change="returnValue"
        />
    </modal-window>
</template>

<script>
    export default {
        name: 'modal-limit',
        data() {
            return {
                limitOptions: [
                    {value: 5, name: 5},
                    {value: 8, name: 8},
                    {value: 10, name: 10},
                    {value: 15, name: 15},
                    {value: 20, name: 20},
                    {value: 100, name: 100}
                ]
            }
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            },
            limitValue: {
                type: Number,
                required: true
            }
        },
        methods: {
            returnValue(event) {
                this.$emit('updateLimit', event.target.value);
            }
        }
        
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.modal__limit{
    background-color: vars.$white-color;
    color: vars.$dark-color;
    box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);
    font-size: 18px;

    h3{
        margin-bottom: 20px;
    }

    .input__limit{
        width: 200px;
    }
}

</style>