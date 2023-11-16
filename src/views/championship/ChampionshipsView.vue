<template>
  <div class="body">
    <div class="main">
      <h1 class="em">Em breve</h1>
      <h1 class="um">.</h1>
      <h1 class="dois">.</h1>
      <h1 class="tres">.</h1>
    </div>
    <rodape lined/>
  </div>
</template>

<script setup>

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
  height: 100vh;
  background-image: url(../../assets/img/Background_Champions.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: 50% 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.main .em{
  animation: MoveUpDown 1s alternate infinite;
}

@keyframes MoveUpDown {
  0%{
    filter: drop-shadow(0 0 0.5rem #fff);
  }
  100% {
    filter: drop-shadow(0 0 2rem #fff);
  }
}

@keyframes MoveUpDown1 {
  20%{
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0px);
  }
}
@keyframes MoveUpDown2 {
  33%{
    transform: translateY(-10px);
  }
  66% {
    transform: translateY(0);
  }
}
@keyframes MoveUpDown3 {
  60%{
    transform: translateY(-10px);
  }
  75% {
    transform: translateY(0);
  }
}

.um{
  animation: MoveUpDown1 1s  infinite;
}
.dois{
  animation: MoveUpDown2 1s  infinite;
}
.tres{
  animation: MoveUpDown3 1s  infinite;
}
</style>