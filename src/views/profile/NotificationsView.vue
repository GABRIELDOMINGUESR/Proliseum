<template>
    <div class="body">
        <div v-if="cards.length <= 0" :key="cards.length"  class="card_props">
            <div class="info_sem">
                <h2>SEM NOTIFICAÇÕES &#128554;</h2>
            </div>
        </div>
        <div v-if="loading" class="loading">
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
        </div>
        <div v-else v-for="card in cards" :key="card.id" class="card_props">
            <div class="info">
                <h3>{{ card.titulo }}</h3>
                <p>{{ card.menssagem }}</p>
            </div>
            <img class="close" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/x.png" @click="handle(card.id)" alt="" srcset="">
        </div>
    </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { axiosPerfil } from "../../axios/axios";


const cards = ref([])


async function handle(e){
    let result = cards.value.filter( (x) => x.id != e)
    cards.value = result
    console.log(cards.value);
    await axiosPerfil.delete('notification/' + e)
      .then(async (response) => {

      })
}

let loading = ref(true)
nextTick( async () => {
    await axiosPerfil.get('notification')
      .then(async (response) => {
        console.log(response.data);
        if(response.data.notifications.length == 0){
            cards.value = []
        }else{
            cards.value = response.data.notifications
        }
        loading.value = false
      })

})

</script>

<style scoped>

.body{
    padding: 30px;
}
.card_props{
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

.info_sem{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 8vw;
  display: grid;
  place-items: center;
  filter: opacity(20%);
  place-self: center;
}

.info{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 8vw;
  display: grid;
}
.close{
    position: absolute;
    transform: translate( 34vw, -3.5vw );
}
.close:hover{
    filter: brightness(0) saturate(100%) invert(42%) sepia(42%) saturate(5000%) hue-rotate(338deg) brightness(95%) contrast(112%);
}

.loading{
    width: 100% ;
    display: grid;
    place-items: center;
}

</style>