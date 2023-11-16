<template>
    <input :id="id" :name="name" type="radio" v-bind="$attrs" @input="$emit('update:modelValue', $event.target.value)" hidden required>
    <label v-if="icon" class="button icon" :for="id">
        <img v-if="icon"  :src="icon">
    </label>    
    <label v-if="label" class="button text" :for="id">
        <p v-if="label" >{{ label }}</p>
    </label>    
</template>

<script setup>
defineProps({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    icon : String,
    label : String,

})

// export default {
//     name: "FormRatio",
//     emits: ["input"],
//     data(){
//         return{
//             font_size : "font-size: " + this.size
//         }
//     },
//     props:{
//         icon: {
//             type: String,
//         },
//         name: {
//             type: String,
//             required: true
//         },
//         id: {
//             type: String,
//             required: true
//         },
//         required: {
//             type: Boolean,
//             default: false
//         },
//         type: {
//             type: String
//         },
//         text : String,
//         size : String,
//         checked : {
//             type : Boolean,
//             default : false
//         }

//     },
//     methods: {
//       onInput(event) {
//         if(event.target.value){
//             this.$emit('input', event.target.value,this.id)
//         }
        
//       }
//     }
// }
</script>

<style scoped>

.button{
    display: block;
    background-color: var(--red);
    border-radius: 10px;

}
.icon{
    width: 5vw;
    height: 5vw;
}
.text{
    width:fit-content;
    height: fit-content;
    padding: 15px 30px 15px 30px;
}
.button img{
    width: 100%;
    filter: brightness(0) saturate(100%)
}

p{
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: var(--font-description);
    padding-left: 5px;
    padding-right: 5px;
}
:checked + .button{
    background-color: #fff;
    transition: all 0.8s
}
:checked + .button img{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}
:checked + .button p{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}




</style>