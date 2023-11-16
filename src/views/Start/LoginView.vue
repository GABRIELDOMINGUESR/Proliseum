<template>
  <div class="body">
    <div class="login">
      <div class="header">
        <img class="logo" src="../../assets/img/logoMain.png">
      </div> 
      <div class="main">
        <h1 class="title">login</h1>
        <login-form/>
      </div>
    </div>
    <div class="background">
      <div class="cadastro">
        <span> Ainda não tem uma conta? </span>
        <router-link to="/register">  
          <new-custom-button label="CADASTRE-SE" size="1.5vw" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../../components/form/loginForm.vue';
import NewCustomButton from "../../components/NewCustomButton.vue";

</script>

<style scoped>

.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.background{
  background-image: url(../../assets/img/backgroundLogin.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: -20vw;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: flex-end;
  justify-content: end;
  padding: 20px;
}

.login{
  display: flex;
  flex-direction: column;
}

.header{
  display: flex;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-between;
}

.main{
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
  place-self: center;
  
}

.logo {
  height: 20vh;
}
.title{
  text-shadow: 0px 10px var(--red);
}

.cadastro{
  display: flex;
  flex-direction: column;
}
</style>