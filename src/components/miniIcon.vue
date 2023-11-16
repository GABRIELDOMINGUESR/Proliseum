<template >
    <div class="container" :style=" {  maxHeight : size, minHeight : size,  minWidth: size }">
        <div class="icon"  :style=" {  maxHeight : size, minHeight : size,  minWidth: size }">
          <img class="image"  :style=" {  maxHeight : size, minHeight : size,  minWidth: size }" :key="src" :src="src">
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  
  const props = defineProps({
    image : {
    },
    size : {
      type: String,
      default: '70px'
    }
  
  })
  
  let src = ref("")
  let size = ref(props.size)
  
  if(props.image){
    src = await props.image
  }else{
    src = props.capa ? ref('https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.') : ref("https://i.ibb.co/jVvMSHY/image-6.png")
  }
  
  const emit = defineEmits(['update:modelValue'])
  
  function getImage(event){
    const image = event.target.files[0]
    // const storageRef = refFB(storage, 'id/profile')
    // uploadBytes(storageRef, image).then( (snapshot) => { console.log('uploaded') } )
  
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e =>{
      src = e.target.result
      emit('update:modelValue', event.target.files[0])
    }
  }
  
  
  </script>
  
  <style scoped>
  
    .icons{
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 25vw;
    }
  
    .icon{
      clip-path: circle();
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .icon2{
      clip-path: inset(30% 0 32% 0);
      display: grid;
      place-items: center;
      overflow: hidden;
      position: absolute;
    }
  
    .iconLarge{
      max-height: v-bind(size);
      min-height: v-bind(size);

      /* max-width: 18vw;
      min-width: 18vw; */
      overflow: hidden;
    }
    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: v-bind(size);
      gap: 0px;
    }
    .image{
      position: static;
      position: absolute;
    }
  </style>