<template>
    <label class="input__valid">
        <div class="pre__text">
            {{ label }}
        </div>
        <input-def
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"

            @input="updateInput"

        />
        <div class="validation__message">
            
            <transition name="valid-message" appear>
                <h3 class="message no-valid"></h3>
            </transition>
        </div>
    </label>
   
</template>

<script>
    export default {
        name: 'input-valid',
        props: {
            type: {
                type: String,
                required: false
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
            modelValue: {
                type: String,
                required: false
            },
            label: {
                type: String,
                required: false 
            },
            class: {
                type: String,
                required: false
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '@/scss/vars';
.input__valid{
    .pre__text{
        font-size: 17px;
        font-weight: 600;
        color: vars.$dark-color;
        opacity: 0.6;
        letter-spacing: 1%;
        margin-bottom: 10px;
    }

    input{
        transition: 0.24s;
        &:hover{
            box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);
        }

        &:focus{
            box-shadow: 0px 0px 6px rgba(34, 30, 204, 0.25);
        }
    }

    .validation__message{
        margin-top: 5px;
        height: 20px;
        .message{
            font-size: 14px;
            font-weight: 400;
            color: vars.$dark-color;

            &.no-valid{
                color: vars.$red-color;
            }
        }
    }
}

.valid-message-enter-active,valid-message-leave-active {
    transition: 0.5s ease;
}
.valid-message-enter-from, .valid-message-leave-to {
    opacity: 0; 
    transform: translateX(10px);
}

</style>