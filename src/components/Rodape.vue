<template>
  <div class="container">
    <div v-if="lined" class="line"></div>
    <p class="text">©2023 - TECNO CEOS, icons by <a href="https://icons8.com">Icons8</a></p> 
  </div>
</template>

<script setup>

defineProps({
  lined : {
    type : Boolean,
    default : false
  }
})




</script>

<style scoped>

  div{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-top: 20px;
    
  }
  .line{
    border-top: 1px solid var(--red);
    height: 1px;
  }
  .text{
    font-size: var(--font-text);
    color: #fffc;
  }
  .text a{
    color: var(--red);
  }
  .container{
    display: flex;
    flex-direction: column;
    place-self: end;
  }

</style>