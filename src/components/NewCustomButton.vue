<template>
  <button type="button" v-bind="$attrs" @click="handleClick" >{{ label }}</button>
</template>

<script setup>
defineProps({
    label : {
        type : String,
        default : "BUTTON"
    },
    size : {
        type : String,
        default : "1rem"
    },
})
const emit = defineEmits(['onClick'])


const handleClick = (event) => {
    emit('onClick')
}

</script>

<style scoped>
    button{
        background-color: var(--red);
        border-radius: 10px;
        border-style: none;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        color: #fff;
        cursor: pointer;
        font-size: v-bind(size);
        font-weight: 900;
        line-height: 1.5;
        display: inline-block;
        margin: 0;
        min-width: fit-content;
        height: fit-content;
        outline: none;
        padding: 15px 30px 15px 30px;
        overflow: hidden;
        position: relative;
        text-align: center;
        text-transform: none;
        touch-action: manipulation;
    }
    button:hover{
        transform: translateY(1px);
    }
    button:active{
        background-color: #fff;
        color: var(--red);
        transform: translateY(3px);
    }
</style>