<template >
  <div class="container">

    <label class="upload" :for="id">
      <div :class="capa ? 'icon2' : 'icon'">
        <img  class="iconLarge" :key="src" :src="src">
      </div>
    </label>
    <input name="arquivo" :id="id" type="file" accept="image/*" @change="getImage" hidden/>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  id : {
    type : String,
    required : true
  },
  capa : {
    type : Boolean,
  },
  image : {
    type: String
  }

})

let src = ref("")

if(props.image){
  src = props.image
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
  }
  .icon2:hover::after{
    content: url(https://img.icons8.com/sf-black/64/FFFFFF/edit-image.png);
    display: grid;
    place-items: center;
    height: 31%;
    width: 100%;
    background-color: #0005;
    position: absolute;
  }

  .iconLarge{
    max-height: 30vh;
    min-height: 30vh;
    /* max-width: 18vw;
    min-width: 18vw; */
    overflow: hidden;
  }
  .iconLarge:hover{
    transform: translateY(1px);
    filter: brightness(50%);
  }
  .icon:hover::after{
    content: url(https://img.icons8.com/sf-black/64/FFFFFF/edit-image.png);
    display: grid;
    place-items: center;
    height: 31%;
    width: 20%;
    background-color: #0005;
    position: absolute;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    gap: 20px;
  }
</style>