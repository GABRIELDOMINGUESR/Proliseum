<template>
  <div class="body">
    <h1>Premium</h1>
    <div class="main">
      <img class="logo" src="../assets/img/logoIcon.png" />
      <div class="box">
        <h3>assine o premium pra desbloquear todas as funcionalidades da nossa plataforma!</h3>
        <BR></BR>
        <NewCustomButton class="button" label="TORNAR-SE UMA LENDA!"/>
      </div>
    </div>

    <Rodape :lined="true"/>
  </div>
</template>

<script setup>
import NewCustomButton from '../components/NewCustomButton.vue';
import Rodape from '../components/Rodape.vue';


</script>

<style scoped>
.body{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle at 100%, var(--background-color), var(--background-color) 50%, var(--red) 110%, var(--background-color) 75%);
  background-repeat: no-repeat;
}

.button{
  animation: fire 1s infinite alternate;
}

@keyframes fire {
  0%{
    filter: drop-shadow(0 0px 0.1rem #FFF);
  }
  100% {
    filter: drop-shadow(0 0px 1rem #FFF);
  }
}


.main{
  display: flex;
  align-items: center;
  width: 70%;
  gap: 20px;
}
.logo{
  filter: drop-shadow(0 20px 0.5rem #000);
}

.box{
  width: 650px;
}
</style>