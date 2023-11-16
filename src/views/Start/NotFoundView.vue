<template>
  <div class="body">
    <div class="titulo">
      <div class="div">
        <h1 class="title">Page not found!</h1>
        <p class="icon">&#128565;</p>
      </div>
      <router-link to="/home">retornar a home</router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .title{
    font-family: 'Cyberjunkies', sans-serif;
    font-size: var(--font-title);
    text-shadow: 0px 10px red;
    font-weight: 100;
  }
  .icon{
    animation: myAnim 4s linear infinite;
    font-size: 100px;
  }

  .titulo{
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .body{
    display: grid;
    height: 100vh;
    place-items: center;
  }
  @keyframes myAnim {
  0%{
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

}
.div{
  display: flex;
}

</style>