<template>
  <div class="body">
    <div class="header">
        <h1 class="title">cadastro</h1>
        <router-link to="/login"> 
            <span class="subtitle">Já tem uma conta?</span>
        </router-link>
    </div>
    
    <RegisterForm/>
    <Rodape :lined="true" />
  </div>

</template>

<script>
import RegisterForm from '../../components/form/RegisterForm.vue';
import Rodape from '../../components/Rodape.vue';
export default {
    name: "RegisterView",
    components:{
        RegisterForm,
        Rodape
    }
}
</script>

<style scoped>
    .body{
        display: grid;
        min-height: 100vh;
        grid-template-rows: max-content 1fr max-content;
    }
    .subtitle{
        font-weight: 100;
        color: var(--red);
        text-decoration-line: underline;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40px 40px 0px 40px;
        background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0, 0, 0, 0.427) 61%);
    }
    .title{
        font-family: 'Cyberjunkies', sans-serif;
        font-size: var(--font-subtitle);
        text-shadow: 0px 0.4vw red;
        font-weight: 100;
        text-transform: uppercase;
    }
</style>