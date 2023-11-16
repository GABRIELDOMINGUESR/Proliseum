<template>
  <div class="body">
    <div class="header">
      <h1>jogadores</h1>
    </div>
    <div class="main">
      <div class="filter">
        <div>
          <NewInputForm label="BUSCAR:" icon="https://img.icons8.com/ios-filled/250/search--v1.png" v-model="busca" @keyup.enter="buscar"/>
        </div>
        <div class="manege">
          <router-link to="/edit"><NewCustomButton label="CRIAR PERFIL DE JOGADOR"/></router-link>
          <router-link to="/teams/create"><NewCustomButton label="DELETAR PERFIL"/></router-link>
        </div>
      </div>
      <template v-if="loading" >
        <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      </template>
      <template v-else>
        <div class="teams">
          <div v-for="card in listOfTeams" :key="card.perfil_id.id" class="card">
            <router-link class="router" :to="`/perfil/${card.perfil_id.id}`">
              <miniIcon :image="getImage(card.perfil_id.id)"  :size="sizeImg"/>
              <h3>"{{ card.nickname }}"</h3>
              <div class="jogo">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <div class="info">
                <div class="cardElo">
                  <p>ELO:</p>
                  <img :src="Elo[parseInt(card.elo)][1]" alt="">
                  <p>{{ Elo[parseInt(card.elo)][0] }}</p>
                </div>
                <div class="cardElo">
                  <p>FUNÇÃO:</p>
                  <img class="funcao" :src="Funcao[parseInt(card.funcao)][1]" alt="">
                  <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
                </div>
              </div>
              <p v-if="card.time_atual">jogando no {{ card.time_atual.nome_time  }}</p>
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <div class="pagination">
        <pagination :elements="elements" :key="elements" :per-page="perPage" v-model="page"/>
    </div>
    <rodape lined/>
  </div>
</template>

<script setup>
import NewCustomButton from "../../components/NewCustomButton.vue";
import rodape from "../../components/Rodape.vue"
import miniIcon from "../../components/miniIcon.vue";
import { axiosPerfil } from "../../axios/axios.js";
import { nextTick, ref, watch } from "vue";
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import NewInputForm from "../../components/form/NewInputForm.vue";
import Pagination from "../../components/Pagination.vue";
import { Elo } from "../../components/enum/Elo"
import { Funcao } from "../../components/enum/Funcao"

const loading = ref(true)
const myteams = ref(false)
const sizeImg = ref("15vw")
let busca = ref("")

const elements= ref(0)
const perPage= ref(20)
const page= ref(1)

watch(page, async() => {
  loading.value = true
  await axiosPerfil.get('player',{ params: { name: busca.value, perPage: perPage.value , page: page.value } }).then( (response) => {
    listOfTeams.value = response.data.players
    loading.value = false
})
} )

const listOfTeams = ref({})

nextTick(async () => {
  await axiosPerfil.get('player',{ params: { name: busca.value, perPage: perPage.value , page: page.value } }).then( (response) => {
  listOfTeams.value = response.data.players
  console.log(response.data);
  elements.value = response.data.limit
  
  console.log(listOfTeams.value);
  loading.value = false
})
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


  
  
  const buscar = async () => {
    loading.value = true
    if(busca.value == ""){
      await axiosPerfil.get('player',{ params: { name: busca.value,perPage: perPage.value , page: page.value } }).then( (response) => {
      console.log(response);
      listOfTeams.value = response.data.players
      elements.value = response.data.limit

      myteams.value = false
      loading.value = false
    })
    }else{
      await axiosPerfil.get('player',{ params: { name: busca.value } }).then( (response) => {
      console.log(response);
      listOfTeams.value = response.data.players
      elements.value = response.data.limit

      myteams.value = false
      loading.value = false
    })
    }

}
  
  
  
  const getMyTimes = async () => {
  loading.value = true
  myteams.value = true
  await axiosPerfil.get('team/myteams').then( (response) => {
  listOfTeams.value = response.data.players
  loading.value = false
})

}





</script>

<style scoped>
.body{
  width: 100%;
}

.header{
  background-image: url(../../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: 50% 20%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.main{
  min-height: 100vh;
}

.filter{
  display: flex;
  padding: 20px;
  justify-content: space-between;
}

.manege{
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;
  background-color: #0005;
  border-radius: 20px;
  height: fit-content;
  max-height: 90vh;
  gap: 10px;
  width: 19vw;
  
}
.cardElo{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .cardElo img{
    height: 5vh;
    max-height: 500px;
  }

.router{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  max-width: 15vw;
  border-radius: 20px;
  gap: 10px;
  text-align: center;
  word-break: break-all;
}

.teams{
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
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
ul{
  display: flex;
}

.info{
  display: flex;
}
.funcao{
  filter: brightness(100%) grayscale(100%)
}

</style>