<template>
      <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="preview">
          <div class="icon">
            <img  class="iconLarge" :key="logosrc" :src="logosrc">
          </div>
            <h3>"{{ time.nome_time }}"</h3>
            <div class="jogoInfo">
              <div class="jogoicon">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
            </div>
        </div>
        <span>*ISSO PODERÁ SER VISUALIZADO NO SEU PERFIL*</span>
        <div class="cadastro">
            <div>
            <span class="title">GAME:</span>
                <div class="jogo">
                <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" :value="0" v-model="time.jogo" checked/>
            </div>
            </div>
            <new-input-form v-model="time.nome_time" label="NOME:" required/>
            <div>
            <span class="title">LOGO:</span>
                <image-upload id="teamPic" v-model="foto_perfil" :image="logosrc" />
            </div>
            <div>
                <span class="title">BIO:</span>
                <textarea name="a" v-model="time.biografia" id="a" maxlength="300" placeholder="Bio..."></textarea>
            </div>
        </div>
        <div class="button_div">
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
            <NewCustomButton type="submit" label="SALVAR"/>
        </div>
    </form>
</template>

<script setup>
import FormRatio from '../../components/form/FormRatio.vue';
import NewInputForm from '../../components/form/NewInputForm.vue';
import NewCustomButton from '../../components/NewCustomButton.vue';
import ImageUpload from '../../components/form/ImageUpload.vue';
import { ref, watch } from 'vue';
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import miniIcon from '../../components/miniIcon.vue';
import storage from '../../firebase/firebase.js'
import { ref as refFB , uploadBytes, getDownloadURL } from 'firebase/storage'



let time = ref({
    jogo: "0",
    nome_time: "",
    biografia: ""
})

let foto_perfil = ref("")


let logosrc = ref("https://i.ibb.co/jVvMSHY/image-6.png")

watch(foto_perfil , () => {
  const reader = new FileReader()
  reader.readAsDataURL(foto_perfil.value)
  reader.onload = e =>{
  logosrc.value =  e.target.result
  }

})



const loading = ref(false)

async function handleSubmit () {
    if(!loading.value){
        loading.value = true
        await axiosPerfil.post('team', JSON.stringify(time.value))
        .then( (response) => {
            loading.value = false
            const message = 'Time Foi criado com sucesso!'
            console.log("oi");
            const storageRefProfile = refFB(storage,'team/' + response.data.id + '/profile')
            if(foto_perfil.value != ""){
                uploadBytes(storageRefProfile, foto_perfil.value)
            }
            createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
            })
        }).catch( (erro) => {
            loading.value = false
            console.log(erro.response.data.error);
            createToast(erro.response.data.error,{
            type : 'danger',
            showIcon : true,
            position : "top-center"
            })
        })
    }

}


</script >

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 20px;
    }
    .cadastro{
        background-color: #0005;
        padding: 20px;
        display:  grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width: 60vw;
    }
    .text{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .jogo{
        display: flex;
        gap: 20px;
    }
    .preview{
        min-height: 350px;
        min-width: 400px;
        background-color: #0005;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .jogoInfo{
        display: flex;
        padding-top: 25px;
        gap: 50px;
    }
    .jogoicon{
        display: block;
        background-color: var(--red);
        border-radius: 10px;
        height: fit-content;
        width: fit-content;
        padding: 10px;
    }
    .elo{
        width: 10vw ;
        position: static;
    }
    .jogoicon img{
        width: 10vh;
        filter: brightness(0) saturate(100%)
    }
    .icon{
    clip-path: circle();
    display: grid;
    place-items: center;
    overflow: hidden;
    }
    .iconLarge{
    max-height: 30vh;
    min-height: 30vh;
    /* max-width: 18vw;
    min-width: 18vw; */
    overflow: hidden;
    }

    .jogador{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .list{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .exclude:hover{
        filter: opacity(50%);
    }

    .button_div{
        display: flex;
    }
    .button_div img{
        height: 50px;
    }
</style>