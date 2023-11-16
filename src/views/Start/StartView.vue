<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../../assets/img/logoMain.png">
      <router-link to="/login">
        <new-custom-button label="LOGIN" size="1.2vw" />
      </router-link>
    </div>
    <div class="main">
      <div class="main1">
        <h1 class="name">proliseum</h1>
        <h3>a melhor plataforma para</h3>
        <h3>encontrar seu time dos sonhos</h3>
        <div class="games">
          <img class="icons" src="../../assets/img/LOL.png" >
          <h3>mais em breve...</h3>
        </div>
      </div>
      <div class="pro">
        <img class="trofel" src="../../assets/img/trofel.png">
        <router-link to="/register">
          <new-custom-button label="TORNE-SE UM PRO" size="2.5vw" />
        </router-link>
      </div>
    </div>
    <div class="footer">
      <rodape/>
    </div>
  </div>
</template>

<script setup>
import NewCustomButton from '../../components/NewCustomButton.vue';
import Rodape from '../../components/Rodape.vue';

</script>

<style scoped>

.body{
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: auto 1fr auto ;
  background-image: url(../../assets/img/backgroundStart.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.header{
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 50px 0px 50px;
  justify-content: space-between;
}
.logo{
  height: 9vw;
}

.main{
  display: flex;
  padding: 0px 175px 0px 175px;
  gap: 100px;
  align-items: center;
  justify-content: center;
}
.main1{
  filter: drop-shadow(0 0 0.7rem #ccc);
}
.name{
  text-shadow: 0px 10px var(--red);
}


.trofel{
  height: 25vw;
  animation: MoveUpDown 1s alternate infinite;
}
.pro{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.games{
  display: flex;
  align-items: center;
  padding-top: 30px;
  gap: 20px;
  color: #FFF;
  align-self: flex-start;
}
.icons{
  height: 5vw;
  filter: brightness(0) saturate(100%) invert(100%) sepia(8%) saturate(0%) hue-rotate(166deg) brightness(107%) contrast(108%);
}


@keyframes MoveUpDown {
  0%{
    transform: translateY(0);
    filter: drop-shadow(0 0 0.5rem var(--red));
  }
  100% {
    transform: translateY(-20px);
    filter: drop-shadow(0 0 2rem var(--red));
  }
}



</style>