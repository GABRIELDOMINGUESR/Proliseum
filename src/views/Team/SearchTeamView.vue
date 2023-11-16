<template>
    <div class="body">
      <div class="header">
        <h1>VAGAS</h1>
      </div>
      <div class="main">
        <div class="main_header">
          <div>
            <h4>ELO MINIMO</h4>
            <select-form default="elo minimo" :list="Elo.map( (x) => { return x[0]})" v-model="elo"/>
          </div>
          <div>
            <h4>DISPONIBILIDADE A PARTIR</h4>
            <NewInputForm  type="time" v-model="horario"/>
          </div>
          <div>
            <h4>FUNÇÃO</h4>
            <select-form default="função" :list="Funcao.map( (x) => { return x[0]})" v-model="funcao"/>
          </div>
          <Newcustombutton label="BUSCAR" size="1vw"/>
        </div>
        <div class="main_main">
          <Newcustombutton class="new" @onClick="isOpen = true" label="MINHA POSTAGEM"/>
          <Modal :open="isOpen" @close="isOpen = !isOpen">
            <div v-if="perfilExist" class="nExist">
              <div>
                <h3>VOCÊ AINDA NÃO TEM PERFIL DE JOGADOR!</h3>
                <router-link to="/edit">
                  <Newcustombutton label="CRIE AQUI!" />
                </router-link>
              </div>
            </div>
            <form v-else class="body" autocomplete="off" @submit.prevent="handleSubmit">
              <SelectForm label="TIME:" v-model="selectedTeam" :list="list.map( (x) => { return x.nome_time})" default="Selecione o time"/>
              <div v-if=" selectedTeam != '' " class="preview" :key="selectedTeam">
                <div class="card_props">
                  <div class="profile">
                    <router-link :to="'/team/' + card.dono_id">
                      <miniIcon class="icon" :image="getImage(card.id_dono)" size="10vw" />
                      <p>{{ card.nickname }}</p>
                    </router-link>
                  </div>
                  <div class="info">
                    <div class="description">
                      <p>{{ card.descricao }}</p>
                    </div>
                    <div class="info_main">
                      <div class="info_card">
                        <h3>ELO</h3>
                        <img :src="Elo[parseInt(card.elo)][1]" alt="" />
                        <p>{{ Elo[parseInt(card.elo)][0] }}</p>
                      </div>
                      <div class="info_card">
                        <h3>FUNÇÃO</h3>
                        <img :src="Funcao[parseInt(card.funcao)][1]" alt="" />
                        <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
                      </div>
                      <div class="info_card">
                        <h3>HORARIO</h3>
                        <h4>{{ card.hora }}</h4>
                      </div>
                      <div class="info_card">
                        <h3>PROS</h3>
                        <p>{{ card.pros }}</p>
                      </div>
                    </div>
                    <div class="info_buttons">
                      <Newcustombutton label="ENVIAR PROPOSTA" />
                    </div>
                  </div>
                </div>
              </div>
              <div>

              </div>
              <span v-if=" selectedTeam != '' ">*ISSO PODERÁ SER VISUALIZADO NO POST*</span>
              <div v-if=" selectedTeam != '' " class="cadastro">
                <div class="text">
                  <h4>ELO MINIMO</h4>
                  <select-form default="elo minimo" :list="Elo.map( (x) => { return x[0]})" v-model="card.elo"/>
                </div>
                <div class="text">
                  <h4>FUNÇÃO</h4>
                  <select-form default="função" :list="Funcao.map( (x) => { return x[0]})" v-model="card.funcao"/>
                </div>
                <div class="text">
                  <span class="title">DESCRIÇÃO:</span>
                  <textarea name="desc" v-model="card.descricao"  id="desc" maxlength="300" placeholder="olá..."></textarea>
                </div>
                <NewInputForm label="horario" v-model="card.hora" type="time"/>
                <div class="text">
                  <span class="title">Prós:</span>
                  <textarea name="pros" v-model="card.pros"  id="pros" maxlength="300" placeholder="Tranquilo..."></textarea>
                </div>
              </div>
              <div class="button_div">
                <Newcustombutton type="submit" label="SALVAR" />
                <Newcustombutton @onClick="remove" label="RETIRAR" />
                <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg" />
              </div>
            </form>
          </Modal>
          <template v-if="loading" >
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          </template>
          <template v-else>
            <div class="card_props" v-for="card in cards" :key="card.id">
              <div class="profile">
                <router-link class="profile" :to="'/perfil/' + card.id"> 
                  <miniIcon class="icon" :image="getImage(card.id)" size="10vw"/>
                  <p>{{ card.nome_time}}</p>
                </router-link>
              </div>
              <div class="info">
                <div class="description"><p>{{ card.descricao }}</p></div>
                <div class="info_main">
                  <div class="info_card">
                    <h3>ELO</h3>
                    <img :src="Elo[parseInt(card.elo)][1]" alt="">
                    <p>{{ Elo[parseInt(card.elo)][0] }}</p>
                  </div>
                  <div class="info_card">
                    <h3>FUNÇÃO</h3>
                    <img :src="Funcao[parseInt(card.funcao)][1]" alt="">
                    <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
                  </div>
                  <div class="info_card">
                    <h3>HORARIO</h3>
                    <h4>{{ card.hora }}</h4>
                  </div>
                  <div class="info_card">
                    <h3>PROS</h3>
                    <p>{{ card.pros }}</p>
                  </div>

                </div>
                <div class="info_buttons">
                  <Newcustombutton label="INSCREVER-SE" @onClick="toProposta(card.dono_id.id)"/>
                </div>
              </div>
            </div>
          </template>
          <div class="pagination">
            <pagination :elements="limit" :key="cards" :per-page="perPage" v-model="page"/>
          </div>
        </div>
      </div>
      <rodape lined/>
    </div>
  </template>
  
  <script setup>
  import SelectForm from '../../components/form/SelectForm.vue'
  import Rodape from '../../components/Rodape.vue';
  import { Elo } from '../../components/enum/Elo'
  import { Funcao } from '../../components/enum/Funcao'
  import NewInputForm from '../../components/form/NewInputForm.vue'
  import Newcustombutton from '../../components/NewCustomButton.vue';
  import miniIcon from '../../components/miniIcon.vue';
  import { nextTick, ref, watch } from 'vue';
  import storage from '../../firebase/firebase.js'
  import { ref as refFB , getDownloadURL } from 'firebase/storage'
  import Modal from '../../components/popup/Modal.vue';
  import { axiosPerfil } from '../../axios/axios.js';
  import Pagination from '../../components/Pagination.vue';
  
  
  const id = localStorage.getItem('id');
  const isOpen= ref(false)
  const perfilExist = ref(false);
  const elo = ref('')
  const horario = ref('')
  const funcao = ref('')
  let loading = ref(true)
  let selectedTeam = ref(0)
  let list = ref([])
  const perPage = ref(5)
  const page = ref(1)
  let limit = ref(0)
  
  let cards = ref([
    {
      id: 14,
      id_dono: '7',
      name: "a",
      description: "a",
      elo: "0",
      funcao: "0",
      horario: "20:00 - 23:00",
      pros: "['1','2','3','4']"
    },
    {
      id: 2,
      name: "b",
      id_dono: '10',
      description: "b",
      elo: "1",
      funcao: "1",
      horario: "19:00 - 23:30",
      pros: "['a','b','c','d']"
    },
  
  ])
  
  const getImage = async (id) =>{
    
    let image
    
    await getDownloadURL(refFB(storage,'team/' + id + '/profile')).then(
      (download_url) => ( image = download_url)
      ).catch( (erro) => {
        image =  "https://i.ibb.co/jVvMSHY/image-6.png"
      })
      
      return image
      
      
    }
  
  
    let card = ref({
    name: "",
    id_dono: 0,
    elo: '0',
    description: '',
    funcao: '0',
    horario: '00:00',
    pros: '',
    tipo: true
  });
  
  
  
nextTick( async () => {
    await axiosPerfil.get('profile/' + id).then(async (response) => {
      if (!response.data.playerProfile) {
        perfilExist.value = true
      }else{
        const jogador = response.data.playerProfile
        console.log(jogador);
        
        card.value.name = response.data.user.nickname
      }
    });
    await axiosPerfil.get('/team/org/' + id).then(async (response) => {
      list.value = response.data.teams
    })

    await axiosPerfil.get('post/0',{ params: { perPage: perPage.value , page: page.value } })
      .then(async (response) => {
    console.log(response.data.post)
    cards = response.data.post
    limit = response.data.limit
    })

    loading.value = false
    
})
  

  
async function remove(){
  if(!loading.value){
    loading.value = true
    await axiosPerfil.delete('post').then(async (response) => {
      const message = 'postagem retidada!'
      loading.value = false
      createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
      })
    })
  }
}
  
watch(selectedTeam, async() => {
  console.log(list.value[selectedTeam.value]);
  card.value.name = list.value[selectedTeam.value].nome_time
  card.value.id_dono= list.value[selectedTeam.value].id
} )
  

async function handleSubmit () {
    if(!loading.value){
        loading.value = true
        if(!editPost.value){
            await axiosPerfil.post('post', JSON.stringify(card.value))
                .then( (response) => {
                  console.log(card.value);
                loading.value = false
                const message = 'Post Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else{
            await axiosPerfil.put('post', JSON.stringify(card.value))
            .then( (response) => {
                loading.value = false
                console.log(card.value);
                const message = 'Post Atualizado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                console.log("error");

                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }
    }else{
        
}

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
  .main_header{
    display: flex;
    gap: 20px;
    padding: 20px;
    max-width: 50%;
  }
  
  
  
  .main_main{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .card_props{
    display: flex;
    padding: 20px;
    align-items: center;
  }
  .profile{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #fff;
  }
  
  
  
  .info{
    background-color: #0005;
    padding: 20px;
    border-radius: 20px;
    min-width: 70vw;
    min-height: 16vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .info_buttons{
    display: flex;
    width: 100%;
    justify-content: end;
  }
  .info_main{
    display: flex;
    justify-content: space-evenly;
  }
  
  .info_card{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 10vw;
  }
  
  .info_card img{
    height: 5vw;
  }
  
  .new{
    padding: 20px;
  }
  
  </style>