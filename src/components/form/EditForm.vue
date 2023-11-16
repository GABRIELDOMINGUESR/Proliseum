<template>
  <form class="form" autocomplete="off" @submit.prevent="handleSubmit($event)">
    <div class="first">
      <div class="cadastro">
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.nome_usuario" label="NOME DE USUARIO:" maxlength="30"  autofocus />
        <new-input-form icon="https://img.icons8.com/ios-filled/100/new-post.png" v-model="cadastro.email" label="EMAIL:" type="email" />
        <new-input-form
          ref="senha"
          icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png"
          v-model="cadastro.senha" 
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Precisa conter pelo menos um numero, uma letra maiuscula e minuscula e ao menos 8 caracteres" 
          label="SENHA:" 
          type="password" 
          />
        <div>
          <new-input-form icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="confPassword" label="CONFIRMAR SENHA:" type="password" />
          <p class="awarn" v-if="cadastro.senha != confPassword && confPassword != '' " >AS SENHAS NÃO SÃO IDENTICAS!</p>
        </div>
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.nome_completo" pattern="[A-Za-z\s]+" title="Não pode possuir numeros" label="NOME COMPLETO:" maxlength="50" optional/>
        <new-input-form icon="https://img.icons8.com/ios-filled/100/planner.png" v-model="cadastro.data_nascimento" label="DATA DE NASCIMENTO:" type="date"  min="1900-01-02" />
        <div>
          <span class="title">GÊNERO:</span>
          <div class="genero">
            <FormRatio id="Masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" name="genero" :value="0" v-model="cadastro.genero" :checked="cadastro.genero == 0 ? true : false"/>
            <FormRatio id="Feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" name="genero" :value="1" v-model="cadastro.genero" :checked="cadastro.genero == 1 ? true : false" />
            <FormRatio id="Outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" name="genero" :value="2" v-model="cadastro.genero" :checked="cadastro.genero == 2 ? true : false"/>
          </div>
        </div>
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.nickname" label="NICKNAME:"/>
        <div>
          <span class="title">CAPA:</span>
          <ImageUpload id="capaPic" v-model="cadastro.capa" :image="srcCapa" capa/>
        </div>

      </div>
    </div>
    <div class="second">
      <div class="submit">
        <ImageUpload id="profilePic" v-model="cadastro.foto_perfil" :image="src" />
        <span class="title">BIO:</span>
        <textarea name="" v-model="cadastro.biografia" id="" maxlength="300" placeholder="Bio..."></textarea>
        <NewCustomButton label="SAIR DO TIME ATUAL" size="1.5vw" @onClick="leaveTeam" />
      </div>
      <div class="end">
        <p class="awarnResponse" v-if="errorLogin" >Email ou Nome de Usuario já cadastrado!</p>
        <div  class="cadastrar">
          <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          <NewCustomButton label="ATUALIZAR" size="1.5vw" type="submit" />
          
        </div>
      </div>
    </div>

  </form>
</template>

<script setup>
import { ref } from "vue";
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';
import NewInputForm from "./NewInputForm.vue";
import NewCustomButton from "../NewCustomButton.vue";
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import router from "../../router";
import storage from '../../firebase/firebase.js'
import { ref as refFB , uploadBytes, getDownloadURL } from 'firebase/storage'


const id = localStorage.getItem('id')
const confPassword = ref("")
let srcCapa = ref("")
let src = ref("")


const cadastro = ref({
  nome_usuario: "" ,
  nome_completo: "",
  email: "",
  senha: "",
  data_nascimento: "",
  genero: 0,
  nickname: "",
  biografia: ""
})
let cadastroAtual = ref({})

await axiosPerfil.get('profile/' + id )
.then( (response) => {
  const profile = response.data.user
  cadastroAtual.value = response.data.user
  cadastroAtual.value.senha = ""

  cadastro.value.nickname = profile.nickname
  cadastro.value.nome_completo = profile.nome_completo
  cadastro.value.biografia = profile.biografia ? profile.biografia : ""
  cadastro.value.data_nascimento = profile.data_nascimento
  cadastro.value.genero = profile.genero
  cadastro.value.nome_usuario = profile.nome_usuario
  cadastro.value.email = profile.email
})
await getDownloadURL(refFB(storage, id + '/capa')).then(
  (download_url) => ( srcCapa.value = download_url)
).catch( (erro) => {
  srcCapa.value = "https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA."
})


await getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( src.value = download_url)
).catch( (erro) => {
  src.value =  "https://i.ibb.co/jVvMSHY/image-6.png"
})


const loading = ref(false)

const errorLogin = ref(false)


async function handleSubmit () {
  loading.value = true

  let update = {}
  
  cadastroAtual.value.nickname != cadastro.value.nickname ? update.nickname = cadastro.value.nickname : false
  cadastroAtual.value.nome_completo != cadastro.value.nome_completo ? update.nome_completo = cadastro.value.nome_completo : false
  cadastroAtual.value.biografia != cadastro.value.biografia ? update.biografia = cadastro.value.biografia : false
  cadastroAtual.value.data_nascimento != cadastro.value.data_nascimento ? update.data_nascimento = cadastro.value.data_nascimento : false
  cadastroAtual.value.genero != cadastro.value.genero ? update.genero = cadastro.value.genero : false
  cadastroAtual.value.nome_usuario != cadastro.value.nome_usuario ? update.nome_usuario = cadastro.value.nome_usuario : false
  cadastroAtual.value.email != cadastro.value.email ? update.email = cadastro.value.email : false
  cadastro.value.senha == confPassword ? update.senha = cadastro.value.senha : false


  console.log(update);
  await axiosPerfil.put('profile',JSON.stringify(update))
  .then( (response) => {
    loading.value = false
    console.log(response);
  })
  .catch( (erro) => {
    console.log(erro);
  })


  const storageRefCapa = refFB(storage, id + '/capa')
  if(cadastro.value.capa){
    uploadBytes(storageRefCapa, cadastro.value.capa)
  }
  const storageRefProfile = refFB(storage, id + '/profile')
  if(cadastro.value.foto_perfil){
    uploadBytes(storageRefProfile, cadastro.value.foto_perfil)
  }

  createToast('Cadastrado alterado com sucesso!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
  router.push('/perfil/'+ id)
}


async function leaveTeam(){
  loading.value =true
  await axiosPerfil.put('player/leave').then( (response) =>{
    loading.value =false
    createToast('Você saiu do time',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
  router.push('/perfil/'+ id)
  })

}


</script>

<style scoped>
  .form{
    padding:20px 20px 0px 20px ;
    display: grid;
    column-gap: 5%;
    grid-template-columns: 1fr 30vw;
  }
  .title{
    font-weight: 900;
    font-size: var(--font-text);
}
  .forms{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100px;
  }

  .cadastro{
    width: 100%;
    height: 98vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    gap: 20px;
    padding: 50px;
    background-color: #0005;
  }

  .genero{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .jogo{
    display: flex;
    gap: 15px;
    width: 100%;
  }
  .submit{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 50px;
    height: 63vh;
    background-color: #0005;
  }

  .awarn{
    color: var(--red);
  }
  textarea:focus{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  textarea:hover{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  textarea{
    outline: none;
    border: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    font-size: var(--font-text);
    resize: none;
    padding: 10px;
    width: 100%;
    height: 6vw;
  }
  .second{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
  .cadastrar{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  .cadastrar img{
    height: 7vh;
  }
  .awarnResponse{
    color: var(--red);
  }

  .end{
    display: flex;
  }
</style>