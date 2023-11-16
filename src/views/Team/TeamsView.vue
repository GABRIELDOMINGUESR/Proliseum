<template>
  <div class="body">
    <div class="header">
      <h1>Times</h1>
    </div>
    <div class="main">
      <div class="filter">
        <div>
          <NewInputForm label="BUSCAR:" icon="https://img.icons8.com/ios-filled/250/search--v1.png" v-model="busca" @keyup.enter="buscar"/>
        </div>
        <div v-if="hasOrg" class="manege">
          <a>
            <NewCustomButton @Click="getMyTimes()" label="MEUS TIMES"/>
          </a>
          <router-link to="/teams/create"><NewCustomButton label="CRIAR TIME"/></router-link>
        </div>
      </div>
      <template v-if="loading" >
        <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      </template>
      <template v-else>
        <div class="teams">
          <div v-for="card in listOfTeams" :key="card.id" class="card">
            <router-link class="router" :to="`/teams/${card.id}`">
              <miniIcon :image="getImage(card.id)"  :size="sizeImg"/>
              <h3>{{ card.nome_time }}</h3>
              <div class="jogo">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <p v-if="!myteams">gerenciado por {{ card.organizacao.dono_id.nickname }}</p>
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <div class="pagination">
        <pagination :elements="elements" :per-page="perPage" v-model="page" :key="elements"/>
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

const loading = ref(true)
const myteams = ref(false)
const hasOrg = ref(false)
const sizeImg = ref("15vw")
let busca = ref("")

const elements= ref(1)
const perPage= ref(20)
const page= ref(1)

watch(page, async() => {
  loading.value = true
  await axiosPerfil.get('team',{ params: { name: busca.value, perPage: perPage.value , page: page.value } }).then( (response) => {
    listOfTeams.value = response.data.teams
    loading.value = false
})
} )

const listOfTeams = ref({})

nextTick( async () => {
  await axiosPerfil.get('team',{ params: { name: busca.value, perPage: perPage.value , page: page.value } }).then( (response) => {
  listOfTeams.value = response.data.teams
  console.log(response.data);
  elements.value = response.data.limit
  
  console.log(listOfTeams.value);
  loading.value = false
})
await axiosPerfil.get('profile')
  .then( async (response) => {
    console.log(response);
    if(response.data.orgProfile){
        hasOrg.value = true
    }
  })
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


  
  
  const buscar = async () => {
    console.log("oi");
    loading.value = true
    await axiosPerfil.get('team',{ params: { name: busca.value, perPage: perPage.value , page: page.value } }).then( (response) => {
      console.log(response);
      listOfTeams.value = response.data.teams
      elements.value = response.data.limit
      myteams.value = false
      loading.value = false
    })
}
  
  
  
  const getMyTimes = async () => {
  loading.value = true
  myteams.value = true
  await axiosPerfil.get('team/myteams').then( (response) => {
  listOfTeams.value = response.data.time
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
  gap: 10px;
  width: 19vw;
  
}
.router{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: 20px;
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


</style>