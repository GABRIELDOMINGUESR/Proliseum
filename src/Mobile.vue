<template>
    <div class="body">
        <div class="logo">
            <img class="logo" src="./assets/img/logoIcon.png" alt="">
            <h1 class="titulo">proliseum</h1>
        </div>
        <div class="links">
            <img src="./assets/img/google-play-badge.png" alt="">
            <p>Google Play e o logotipo do Google Play são marcas registradas da Google LLC.</p>
            <!-- <img src="./assets/img/Download_on_the_App_Store_Badge_PTBR_RGB_blk_092917.svg" alt=""> -->
        </div>
        <p class="rodape">©2023 - TECNO CEOS</p>
    </div>
</template>

<script setup>
</script>

<style scoped>
.body{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    background-image: url(./assets/img/backgroundMobile.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.logo{
    height: 50vw;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
}

.titulo{
    font-family: 'Cyberjunkies', sans-serif;
    font-size: var(--font-title);
    text-shadow: 0px 5px red;
    font-weight: 100;
}

.links{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    padding: 20px;
}
.links p{
    padding: 0 40px 20px 40px;
}

.links img{
    width: 80%;
}

.rodape{
    font-size: var(--font-description);
}
</style>