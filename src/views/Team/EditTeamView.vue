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
              <span class="title">CAPA:</span>
              <ImageUpload id="capaPic" v-model="foto_capa" :image="srcCapa" capa/>
          </div>
        <div>
            <span class="title">BIO:</span>
            <textarea name="a" v-model="time.biografia" id="a" maxlength="300" placeholder="Bio..."></textarea>
        </div>
        <div>

        </div>
        <div class="list">
            <h4>JOGADORES [{{ jogadores.length }}/10]:</h4>
            <div class="jogador" v-for="jogador in jogadores" :key="jogador.id">
                <mini-icon :image="getImage(jogador.perfil_id.id)" />
                <span>{{ jogador.nickname }}</span>
                <NewCustomButton label="EXCLUIR" @onClick="deleteJogador(jogador.perfil_id.id)"/>
            </div>
        </div>
    </div>
    <div class="button_div">
      <NewCustomButton type="submit" label="SALVAR"/>
      <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      <NewCustomButton label="DELETAR" @on-click="deleteTeam"/>
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
import router from '../../router';


const id = router.currentRoute.value.params.id

let time = ref({
jogo: "0",
nome_time: "",
biografia: ""
})

let foto_perfil = ref("")
let foto_capa = ref("")
let jogadores = ref({})


let logosrc = ref("https://i.ibb.co/jVvMSHY/image-6.png")
let srcCapa = ref('')

watch(foto_perfil , () => {
const reader = new FileReader()
reader.readAsDataURL(foto_perfil.value)
reader.onload = e =>{
logosrc.value =  e.target.result
}

})

let cadastroAtual = ref({})

await axiosPerfil.get('team/' + id )
.then( (response) => {
  const profile = response.data.teams[0]
  console.log(profile);
  cadastroAtual.value = profile
  time.value.nome_time = profile.nome_time
  time.value.biografia = profile.biografia
  jogadores = profile.jogadores

  console.log(profile);
})
await getDownloadURL(refFB(storage,'team/'+ id + '/capa')).then(
  (download_url) => ( srcCapa.value = download_url)
).catch( (erro) => {
  srcCapa.value = "https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA."
})


await getDownloadURL(refFB(storage,'team/'+ id + '/profile')).then(
  (download_url) => ( logosrc.value = download_url)
).catch( (erro) => {
  logosrc.value =  "https://i.ibb.co/jVvMSHY/image-6.png"
})


const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage, id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
    
    
  }






const loading = ref(false)

async function deleteTeam () {
  loading.value = true
    await axiosPerfil.delete('team/'+ id).then(
        (response) => {
            if(response.value){
              loading.value = false
                const message = 'Perfil Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            }else{
              loading.value = false
                const message = 'Erro ao deletar!'
                createToast(message,{
                type : 'danger',
                showIcon : true,
                position : "top-center"
                })
            }
        }
    )
}




async function handleSubmit () {
if(!loading.value){
    loading.value = true
    await axiosPerfil.put('team/'+ id, JSON.stringify(time.value))
    .then( (response) => {
        loading.value = false
        const message = 'Time Foi atualizado com sucesso!'
        console.log("oi");
        const storageRefProfile = refFB(storage,'team/' + id + '/profile')
        if(foto_perfil.value != ""){
            uploadBytes(storageRefProfile, foto_perfil.value)
        }
        const storageRefCapa = refFB(storage,'team/' + id + '/capa')
        if(foto_capa.value != ""){
            uploadBytes(storageRefCapa, foto_capa.value)
        }
        createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
        })
    }).catch( (erro) => {
        console.log(erro);
        loading.value = false
        const message = 'Erro!'
        createToast(message,{
        type : 'danger',
        showIcon : true,
        position : "top-center"
        })
    })
}

}

async function deleteJogador(idJogador){
  loading.value = true
    await axiosPerfil.delete('team/'+ id + '/' + idJogador)
        .then( (response) => {
          loading.value = false
            const message = 'Jogador foi excluido!(espere alguns segundos!!!)'
            createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
            })

            })

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