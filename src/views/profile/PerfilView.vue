<template>
      <div class="body">
        <div class="header">
          <div class="edit" v-if="!editar && canProposta">  
            <Modal class="proposta" :open="isOpen" @close="isOpen = !isOpen">
              <form class="form" autocomplete="on">
                <SelectForm label="TIME:" v-model="selectedTeam" :list="list.map( (x) => { return x.nome_time})" default="Selecione o time"/>
                <span class="title">mensage:</span>
                <textarea name="" v-model="message"  id="" maxlength="300" placeholder="Olá..."></textarea>
                <div class="boton">
                  <img v-if="loading" style="height: 5vh;width: 5vh;" class="loading" src="../../assets/img/Rolling-1s-323px.svg">
                  <NewCustomButton label="ENVIAR" @onClick="proposta"  />
                </div>

            </form>
            </Modal>
            <NewCustomButton label="ENVIAR PROPOSTA" @onClick="isOpen = true"/>
          </div>
          <div v-if="editar" class="edit">
            <router-link to="/search/post" >
              <NewCustomButton label="MINHA POSTAGEM"/>
            </router-link>
            <router-link to="/perfil/editar" >
              <NewCustomButton class="editar" label="EDITAR PERFIL"></NewCustomButton>
            </router-link>
          </div>
        </div>
        <div class="main">
          <div class="info" >
            <div class="icon">
              <miniIcon :image="src" size="29vh"/>
            </div>
            
            <h3 class="nome"><router-link class="select" :to="'/teams/' + timeAtual"><miniIcon :image="image"/></router-link>{{ nome }}</h3>
            <h4 class="nomeCompleto">{{ nomeCompleto }}</h4>
            <div v-if="orgExist">
              <p class="dono">DONO DA <router-link class="select" :to="'/org/' + id"> <span>{{ nome_organizacao }}</span> <mini-icon :image="srcLogo"/></router-link></p>
            </div>
            <div v-if="jogadorExist">
              <div class="card">
                <img :src="srcElo" alt="">
                <p>{{ elo }}</p>
                <h3>"{{ nickname }}"</h3>
              </div>
              <div class="jogoInfo">
                <div class="jogo">
                  <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
                </div>
                <div class="jogo">
                  <img :src="srcFuncao" alt="">
                </div>
              </div>
            </div>

          </div>
          <div class="main2">
            <div class="descricao">
              <p>{{ descricao }}</p>
            </div>
            <div>
              <h3>highlights:</h3>
            </div>
          </div>
        </div>
        <Rodape lined/>
      </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router";
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import { axiosPerfil } from "../../axios/axios";
import Rodape from '../../components/Rodape.vue'
import { Elo } from '../../components/enum/Elo';
import { Funcao } from '../../components/enum/Funcao'
import  miniIcon  from '../../components/miniIcon.vue'
import NewCustomButton from "../../components/NewCustomButton.vue";
import NewInputForm from "../../components/form/NewInputForm.vue";
import Modal from "../../components/popup/Modal.vue";
import SelectForm from "../../components/form/SelectForm.vue";
import { createToast } from 'mosha-vue-toastify';

const isOpen = ref(false)
let canProposta = ref(false)
const editar = ref(false)
const id = router.currentRoute.value.params.id
const idLocal = localStorage.getItem('id')
let list = ref([])
let selectedTeam = ref(0)
let message = ref('')
let loading = ref(false)

async function proposta(){
  if(!loading.value){  
    loading.value = true
    console.log(list[selectedTeam.value]);
    console.log(message.value);
    await axiosPerfil.post('offer/' + list[selectedTeam.value].id +'/'+ id, JSON.stringify({ menssage: message.value }))
    .then( (response) => {
      loading.value = false
      const message = 'Proposta Enviada!'
      createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
      })
      console.log(response.data);
    }).catch((erro) => {
      console.log(erro);
      const message = 'Não foi possivel enviar a proposta!'
      loading.value = false
      createToast(message,{
        type : 'danger',
        showIcon : true,
        position : "top-center"
      })
    })}
}



let src = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let timeAtual = ref("")
let image = ref("")

let jogadorExist = ref(false)
let orgExist = ref(false)

let jogo = ref('0')
let srcFuncao = ref(Funcao[parseInt(2)][1])
let elo = ref("Unranked")
let srcElo = ref(Elo[parseInt(0)][1])
let nickname = ref("")

let nome_organizacao = ref("")



if(localStorage.getItem('id') == id){
  editar.value = true
}
await axiosPerfil.get('profile/' + id )
.then( (response) => {
  const profile = response.data.user

  if(response.data.playerProfile){
    if(response.data.playerProfile.time_atual){
      timeAtual = response.data.playerProfile.time_atual.id
    }
  }
  nome = profile.nickname
  nomeCompleto = profile.nome_completo
  descricao = profile.biografia ? profile.biografia : ""

  if(response.data.playerProfile){
    jogadorExist = true
    const jogador = response.data.playerProfile

    elo = Elo[parseInt(jogador.elo)][0]
    nickname = jogador.nickname
    srcFuncao = Funcao[parseInt(jogador.funcao)][1]
    srcElo = Elo[parseInt(jogador.elo)][1]
    jogo = jogador.jogo
    nickname = jogador.nickname
  }else{
    jogadorExist = false
  }
  if(response.data.orgProfile){
    orgExist = true
    const org = response.data.orgProfile

    nome_organizacao = org.nome_organizacao

  }else{
    orgExist = false
  }
  
}).catch( (erro) => {

  console.log(erro);

  router.push({name: "Not_Found", params: { notFound: "perfil/" + id }})

})

await axiosPerfil.get('profile/' + idLocal )
.then( (response) => {
  if(response.data.orgProfile){
    canProposta = true
  }else{
    canProposta = false
  }
  
}).catch( (erro) => {

  console.log(erro);

  router.push({name: "Not_Found", params: { notFound: "perfil/" + id }})

})




await getDownloadURL(refFB(storage, id + '/capa')).then(
  (download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
  srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( src = download_url)
).catch( (erro) => {
  src =  "https://i.ibb.co/jVvMSHY/image-6.png"
})

let srcLogo = ref("")

await getDownloadURL(refFB(storage, id + '/orgprofile')).then(
  (download_url) => ( srcLogo = download_url)
).catch( (erro) => {
  srcLogo =  "https://i.ibb.co/jVvMSHY/image-6.png"
})

await getDownloadURL(refFB(storage,'team/'+ timeAtual + '/profile')).then(
  (download_url) => ( image = download_url)
).catch( (erro) => {
  image =  ""
})

if(!editar.value){

  await axiosPerfil.get('team/org/' + idLocal )
  .then( (response) => {
      list = response.data.teams
  })

}



  

</script>
  
<style scoped>
  .body{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header{
    height: 45vh;
    background-image: v-bind(srcCapa);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: grid;

    place-items: end;
  }
  .editar{
    color: #fff;
  }
  .main{
    display: grid;
    grid-template-columns: 40vh 1fr;
    padding: 0px 50px 0px 50px;
  }
  .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-16vh);
    gap: 10px;
    width: 20vw;
  }

  .iconLarge{
    max-height: 28vh;
    min-height: 28vh;
    overflow: hidden;
    clip-path: circle();
  }
  .icon{
    min-width: 30vh;
    min-height: 30vh;
    clip-path: circle();
    background-color: var(--background-color);
    display: grid;
    place-items: center;
    overflow: hidden;
  }
  .jogoInfo{
    display: flex;
    padding-top: 25px;
    gap: 50px;
  }
  .jogo{
    display: block;
    background-color: var(--red);
    border-radius: 10px;
    height: fit-content;
    width: fit-content;
    padding: 10px;
  }
  .jogo img{
    width: 10vh;
    filter: brightness(0) saturate(100%)
}

  .nome{
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(-30px);
    word-break: break-all;
  }
  .nome img{
    height: 8vh;
  }
  .nomeCompleto{
    color: #fff5;
  }
  .main2{
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .plusInfo{
    display: flex;
    gap: 100px;
  }

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .card img{
    height: 20vh;
  }

  .descricao{
    display: block;
    background-color: #0002;
    border-radius: 10px;
    max-width: 50vw;
    min-height: 200px;
    padding: 10px;
    width: 80%;
    word-break: break-all;
    margin-top: 20px;
  }
  .edit{
    display: flex;
    align-items: center;
    background: #0008;
    margin: 0px 30px 10px 0px;
    padding: 0px 5px 0px 5px;
    gap: 20px;
  }
  .edit img{
    width: 40px;
    height: 40px;
  }
  .dono{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
  .select{
    color: #fff;
    display: flex;
    align-items: center;
  }

  .loading{
  height: 20vw;
}
.loading_div{
  display: grid;
  background-color: #0005;
  place-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.boton{
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
