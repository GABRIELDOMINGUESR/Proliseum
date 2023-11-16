<template>
  <form class="form" autocomplete="on">
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="login.login" label="NOME DE USUARIO:" autofocus/>
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="login.senha" label="SENHA:" type="password" @keyup.enter="makeLogin" />
    <p class="awarn" v-if="errorLogin" >Login ou senha invalidos!</p>
    <router-link class="recuperar" to="/recovery">  
        <h3 style="font-size: 0.8vw"> Esqueceu sua senha?</h3>
    </router-link>
    <div class="login">
      <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      <NewCustomButton class="loginButton" label="LOGIN" size="1vw" @onClick="makeLogin" :disabled="loading" />
    </div>
  </form>
</template>

<script setup>
import { createToast } from 'mosha-vue-toastify';
import { onBeforeMount, ref } from 'vue';
import router from '../../router';
import NewCustomButton from '../NewCustomButton.vue';
import NewInputForm from './NewInputForm.vue';
import { axiosPerfil } from '../../axios/axios';

onBeforeMount( () => {
})



const login = ref({
  login: "",
  senha: ""
})



const errorLogin = ref(false)

const loading = ref(false)

 async function makeLogin(){
  errorLogin.value = false
  //const response = await axios.post('Register',cadastro)
  if(!loading.value){
    loading.value = true
    await axiosPerfil.post('login', JSON.stringify(login.value))
  .then( (response) => {
    loading.value = false
    const message = 'Bem Vindo(a) ' + response.data.user.nome_completo.split(" ")[0] + "!"
    createToast(message,{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', response.data.user.nome_usuario)
    localStorage.setItem('id', response.data.user.id)
    router.push('/home')
  })
  .catch( (error) => {
    loading.value = false
    console.log(error);

    if(error.response.status == 400){
      errorLogin.value = true
      createToast('Login ou senha invalidos!',{
      type : 'warning',
      showIcon : true,
      position : "top-center"
    })
    }else{
      createToast('Erro interno, Tente novamente!',{
      type : 'danger',
      showIcon : true,
      position : "top-center"
      })
    }

  })
}


}
</script>

<style scoped>
  .form{
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 50px 50px 50px;
    background-color: #0005;
    border-radius: 50px;
  }
.recuperar{
    align-self: flex-end;
    color: var(--red);
    text-decoration: underline;
}
  .awarn{
    color: var(--red);
  }
  .login{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  .login img{
    height: 7vh;
  }

</style>