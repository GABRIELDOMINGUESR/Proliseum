<template>
    <div class="body">
      <div class="header">
        <div v-if="editar" class="edit">
        <router-link to="/org/editar" >
          <NewCustomButton class="editar" label="EDITAR ORG"></NewCustomButton>
          </router-link>
        </div>
      </div>
      <div class="main">
        <div class="info" >
          <router-link :to="'/perfil/' + id">
            <miniIcon class="dono" :image="srcDono"/>
          </router-link>
          <div class="icon">
            <img  class="iconLarge" :key="src" :src="src">
          </div>
          <h3 class="nome"> <mini-icon :image="src"/>{{ nome }}</h3>
          <h4 class="nomeCompleto">{{ nomeCompleto }}</h4>
          <div v-if="jogadorExist">
            <div class="card">
              <img :src="srcElo" alt="">
              <p>{{ elo }}</p>
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
            <h3>TIMES:</h3>
            <div>
              <template v-if="loading">
                <h1>teste</h1>
              </template>
              <template v-else>
                <div class="teams" v-if="listOfTeams.teams.length > 0">
                  <div v-for="card in listOfTeams.teams" :key="card.id" class="card">
                    <router-link class="router" :to="`/teams/${card.id}`">
                      <miniIcon :image="getImage(card.id)" size="200px"/>
                      <h3>{{ card.nome_time }}</h3>
                    </router-link>
                  </div>
                </div>
              </template>
            </div>
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
import miniIcon from "../../components/miniIcon.vue";
import NewCustomButton from "../../components/NewCustomButton.vue";

const editar = ref(false)
const id = router.currentRoute.value.params.id


let loading = ref(true)

let listOfTeams = ref({})
let listOfPlayers = ref({ })

await axiosPerfil.get('team/org/' + id).then( (response) => {
  listOfTeams = response.data
  console.log(listOfTeams);
  loading = false
})





let src = ref('')
let srcDono = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let timeAtual = ref("FA")

let jogadorExist = ref(false)



if(localStorage.getItem('id') == id){
editar.value = true
}
await axiosPerfil.get('profile/' + id )
.then( (response) => {
  if(response.data.orgProfile == false){
    router.push({name: "Not_Found", params: { notFound: "org/" + id }})
  }
  const profile = response.data.orgProfile
  nome = profile.nome_organizacao
  nomeCompleto = profile.nome_completo
  descricao = profile.biografia ? profile.biografia : ""


})
await getDownloadURL(refFB(storage, id + '/orgcapa')).then(
(download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, id + '/orgprofile')).then(
  (download_url) => ( src = download_url)
).catch( (erro) => {
  src =  "https://i.ibb.co/jVvMSHY/image-6.png"
})

await getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( srcDono = download_url)
).catch( (erro) => {
  srcDono =  "https://i.ibb.co/jVvMSHY/image-6.png"
})


const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage, 'team/'+ id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
    
    
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
  position: absolute;
  z-index: 10;
  transform: translate(50px);
}

.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;
  background-color: #0005;
  border-radius: 20px;
  
}
.router{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: 20px;
}

.teams{
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}
</style>
