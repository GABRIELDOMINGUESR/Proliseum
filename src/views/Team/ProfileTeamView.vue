<template>
    <div class="body">
      <div class="header">
        <div v-if="editar" class="edit">
        <NewCustomButton label="MINHA POSTAGEM"/>
        <NewCustomButton class="editar" label="ENTRAR NO TIME" @onClick="entrarTime(idOrg)"></NewCustomButton>
          <router-link :to="'/teams/editar/'+ id" >
            <NewCustomButton class="editar" label="EDITAR PERFIL"></NewCustomButton>
          </router-link>
        </div>
      </div>
      <div class="main">
        <div class="info" >
          <div class="icon">
            <img  class="iconLarge" :key="src" :src="src">
          </div>
          <h3 class="nome"> <router-link class="select" :to="'/teams/' + timeAtual"><miniIcon :image="src"/></router-link>{{ nome }}</h3>
          <h4 class="nomeCompleto">gerenciado por<router-link :to="'/org/'+ idOrg"> {{ nomeCompleto }}</router-link></h4>
          <div class="jogo">
            <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
          </div>
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
            <div class="list">
              <h4>JOGADORES [{{ jogadores.length }}/10]:</h4>
              <div class="jogador" v-for="jogador in jogadores" :key="jogador.id">
                  <router-link class="jogador" :to="'/perfil/' + jogador.perfil_id.id ">
                    <mini-icon :image="getImage(jogador.perfil_id.id)" />
                    <span class="nick"><img class="funcao" :src="Funcao[parseInt(jogador.funcao)][1]" alt=""> {{ jogador.nickname }}  </span>
                  </router-link>
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
import NewCustomButton from "../../components/NewCustomButton.vue";
import { createToast } from "mosha-vue-toastify";
import miniIcon from "../../components/miniIcon.vue";


const editar = ref(false)
const id = router.currentRoute.value.params.id

let src = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let timeAtual = ref("FA")
let idOrg = ref("")

let jogadorExist = ref(false)

let jogo = ref('0')
let srcFuncao = ref(Funcao[parseInt(2)][1])
let elo = ref("Unranked")
let srcElo = ref(Elo[parseInt(0)][1])
let nickname = ref("")
let jogadores = ref({})


if(localStorage.getItem('id') == await axiosPerfil.get('team')){

}
await axiosPerfil.get('team/' + id )
.then( (response) => {
  const profile = response.data.teams[0]
  console.log(profile);
  nome = profile.nome_time
  nomeCompleto = profile.organizacao.nome_organizacao
  idOrg = profile.organizacao.dono_id.id
  jogadores = profile.jogadores

  if(localStorage.getItem('id') == idOrg){
    editar.value = true
  }
  descricao = profile.biografia ? profile.biografia : ""

// if(response.data.playerProfile){
//   jogadorExist = true
//   const jogador = response.data.playerProfile

//   elo = Elo[parseInt(jogador.elo)][0]
//   srcFuncao = Funcao[parseInt(jogador.funcao)][1]
//   srcElo = Elo[parseInt(jogador.elo)][1]
//   jogo = jogador.jogo
//   nickname = jogador.nickname
// }else{
//   jogadorExist = false
// }

})
await getDownloadURL(refFB(storage,'team/'+ id + '/capa')).then(
(download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, 'team/'+ id + '/profile')).then(
(download_url) => ( src.value = download_url)
).catch( (erro) => {
src.value =  "https://i.ibb.co/jVvMSHY/image-6.png"
})


async function entrarTime(idJogador){
  await axiosPerfil.put('team/' + id + '/' + idJogador )
    .then( (response) => {
      const message = 'Você entrou!(espere alguns segundos!!!)'
            createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
            })
            window.location.reload(true)
    }).catch( (erro) => {
      const message = 'Sem Perfil de Jogador ou Já está em um time!'
      createToast(message,{
        type : "warning",
        showIcon : true,
        position : "top-center"
      })
    })
}

const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage, id + '/profile')).then(
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
  transform: translateX(-30px);
  word-break: break-all;
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

.jogador{
    display: flex;
    align-items: center;
    gap: 20px;
    color: #FFF;
}
.list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.funcao{
  filter: brightness(100%) grayscale(100%)
}

.nick{
  display: flex;
  align-items: center;
}
.nick img{
  height: 5vh;
}
</style>
