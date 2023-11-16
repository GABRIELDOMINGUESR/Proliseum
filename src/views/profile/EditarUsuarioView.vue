<template>
  <div>
    <h1 class="title">editar</h1>
    <EditForm/>
    <Rodape lined/>
  </div>
</template>

<script setup>
import Rodape from '../../components/Rodape.vue';
import EditForm from '../../components/form/EditForm.vue';


</script>

<style scoped>
    .title{
        font-family: 'Cyberjunkies', sans-serif;
        font-size: var(--font-subtitle);
        text-shadow: 0px 0.4vw red;
        font-weight: 100;
        text-transform: uppercase;
        padding: 20px;
    }
</style>