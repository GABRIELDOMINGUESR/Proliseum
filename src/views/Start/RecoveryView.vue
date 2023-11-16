<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../../assets/img/logoIcon.png" />
      <h1 class="titulo">Recuperar senha</h1>
    </div>
    <div class="main">
      <form class="reiniciarSenha" @submit.prevent="sendEmail">
        <p class="text">Para reiniciar a senha digite seu E-mail</p>
        <NewInputForm label="EMAIL:" v-model="email" type="email" required/>
        <NewCustomButton type="submit" label="ENVIAR" size="2rem" />
      </form>
      <router-link to="/login">
        <NewCustomButton label="VOLTAR" size="1rem" />
      </router-link>
      
    </div>
    <Rodape/>
  </div>
</template>
  

<script setup>
import { ref } from "vue";
import NewCustomButton from "../../components/NewCustomButton.vue";
import NewInputForm from "../../components/form/NewInputForm.vue";
import Rodape from '../../components/Rodape.vue';
import { createToast } from "mosha-vue-toastify";


const email = ref("")

function sendEmail() {
  console.log('teste');
  createToast('Email enviado!',{
    type : 'success',
    showIcon : true,
    position : "top-center"
  })
}

</script>

<style scoped>
.body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.logo {
  height: 10vw;
}

.main {
  display: flex;
  padding: 20px 175px 0px 175px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.titulo {
  font-family: 'Cyberjunkies', sans-serif;
  font-size: var(--font-subtitle);
  text-shadow: 0px 5px red;
  font-weight: 100;
}

.reiniciarSenha {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 980px;
  height: 376px;
  background-color: #0005;
}

.text{
  margin:45px 0 0 0 ;
  font-size: 32px;
  font-weight: 400;
}

.email{
  display: flex;
  flex-direction: column;
}

input{
  width: 625px;
  height: 56px;
}

label{
  font-weight: 900;
}
.botaoReiniciar{
margin: 35px 0 0 0 ;
}

.footer{
display: flex;
justify-content: center;
margin: 100px 0 0 0 ;
border-top: solid 1.5px var(--red);
}

.footer p{
  padding: 10px;
}
</style>