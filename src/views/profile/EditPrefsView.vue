<template>
    <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="forms">
            <FormRatio id="jogador" label="JOGADOR" name="cadastro" value="jogador" v-model="usuario" checked/>
            <FormRatio id="organizador" label="ORGANIZAÇÃO" name="cadastro" value="organizador" v-model="usuario"/>
        </div>
        <div class="preview" v-if="usuario == 'jogador'"  >
            <img class="elo" :src="eloSrc" alt="" srcset="">
            <p>{{ eloName }}</p>
            <h3>"{{ jogador.nickname }}"</h3>
            <div class="jogoInfo">
              <div class="jogoicon">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <div class="jogoicon">
                <img :src="funcaoSrc" alt="">
              </div>
            </div>
        </div>
        <span v-if="usuario == 'jogador'">*ISSO PODERÁ SER VISUALIZADO NO SEU PERFIL*</span>
        <div class="cadastro" v-if="usuario == 'jogador'">
            <div>
            <span class="title">GAME:</span>
                <div class="jogo">
                <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" :value="0" v-model="jogador.jogo" checked/>
            </div>
            </div>
            <new-input-form v-model="jogador.nickname" label="NICKNAME:" required/>
            <div>
            <span class="title">FUNÇÃO:</span>
                <div class="jogo">
                    <FormRatio name="funcao"  id="top" icon="https://cdn3.emoji.gg/emojis/TopLane.png" :value="0" v-model="jogador.funcao" :checked="jogador.funcao == 0 ? true : false"/>
                    <FormRatio name="funcao"  id="jg" icon="https://cdn3.emoji.gg/emojis/Jungle.png" :value="1" v-model="jogador.funcao" :checked="jogador.funcao == 1 ? true : false"/>
                    <FormRatio name="funcao"  id="mid" icon="https://cdn3.emoji.gg/emojis/MidLane.png" :value="2" v-model="jogador.funcao" :checked="jogador.funcao == 2 ? true : false"/>
                    <FormRatio name="funcao"  id="adc" icon="https://cdn3.emoji.gg/emojis/ADC.png" :value="3" v-model="jogador.funcao" :checked="jogador.funcao == 3 ? true : false"/>
                    <FormRatio name="funcao"  id="sup" icon="https://cdn3.emoji.gg/emojis/Support.png" :value="4" v-model="jogador.funcao" :checked="jogador.funcao == 4 ? true : false"/>
                </div>
            </div>
            <SelectForm name="elo" label="ELO:" :list="Elo.map( (x) => { return x[0]})" :selected="Elo.map( (x) => { return x[0]})[jogador.elo]" default="Porfavor informe o seu elo" v-model="jogador.elo"/>
        </div>
        <div class="cadastro" v-if="usuario == 'organizador'">
            <div class="text">
                <new-input-form v-model="organizador.nome_organizacao" label="NOME DA ORGANIZAÇÃO:" required/>
                <span class="title">BIO:</span>
                <textarea name="" v-model="organizador.biografia" id="" maxlength="300" placeholder="Bio..."></textarea>
            </div>
            <div>
                <span class="title">LOGO:</span>
                <ImageUpload id="orgPic" v-model="organizador.logo" :image="srcLogo"/>
            </div>
            <div>
                <span class="title">CAPA:</span>
                <ImageUpload id="capaPic" v-model="organizador.capa" :image="srcCapa" capa/>
            </div>
        </div>
        <div class="button_div">
            <NewCustomButton type="submit" label="SALVAR"/>
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
            <NewCustomButton @onClick="deleteProfile" :label="'EXCLUIR '+ usuario.toUpperCase()"/>
        </div>
    </form>
</template>

<script setup>
import FormRatio from '../../components/form/FormRatio.vue';
import NewInputForm from '../../components/form/NewInputForm.vue';
import NewCustomButton from '../../components/NewCustomButton.vue';
import ImageUpload from '../../components/form/ImageUpload.vue';
import { ref, watch } from 'vue';
import SelectForm from '../../components/form/SelectForm.vue';
import { Elo } from '../../components/enum/Elo';
import { Funcao } from '../../components/enum/Funcao'
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import storage from '../../firebase/firebase.js'
import { ref as refFB , uploadBytes, getDownloadURL } from 'firebase/storage'


let usuario = ref("jogador")
const id = localStorage.getItem('id')

let jogador = ref({
    elo: "0",
    jogo: "0",
    funcao: "0",
    nickname: "",
})

const editJogador = ref(false)
await axiosPerfil.get('profile/' + id )
.then( (response) => {
    if(response.data.playerProfile){
        editJogador.value = true
        const profile = response.data.playerProfile

        jogador.value.elo = profile.elo
        jogador.value.funcao = profile.funcao
        jogador.value.jogo = profile.jogo
        jogador.value.nickname = profile.nickname
    }
})
let organizador = ref({
    nome_organizacao: "",
    biografia: "",
    capa: ""
})

const editOrg = ref(false)
let srcLogo = ref("")
let srcCapa = ref("")
await axiosPerfil.get('profile/' + id )
.then( async (response) => {
    if(response.data.orgProfile){
        editOrg.value = true
        const profile = response.data.orgProfile
        organizador.value.nome_organizacao = profile.nome_organizacao
        organizador.value.biografia = profile.biografia
    }
    await getDownloadURL(refFB(storage, id + '/orgprofile')).then(
    (download_url) => ( srcLogo.value = download_url)
    ).catch( (erro) => {
        srcLogo.value = "https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA."
    })
    await getDownloadURL(refFB(storage, id + '/orgcapa')).then(
    (download_url) => ( srcCapa.value = download_url)
    ).catch( (erro) => {
        srcCapa.value = "https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA."
    })
})






let funcaoSrc = ref(Funcao[parseInt(jogador.value.funcao)][1])
let eloSrc = ref(Elo[parseInt(jogador.value.elo)][1])
let eloName = ref(Elo[parseInt(jogador.value.elo)][0])

watch(jogador.value, () => {
    funcaoSrc.value = Funcao[parseInt(jogador.value.funcao)][1]
    eloSrc.value = Elo[parseInt(jogador.value.elo)][1]
    eloName = Elo[parseInt(jogador.value.elo)][0]
})





const loading = ref(false)

async function handleSubmit () {
    if(!loading.value){
        loading.value = true
        if(usuario.value == "jogador" && !editJogador.value){
            
            await axiosPerfil.post('player', JSON.stringify(jogador.value))
                .then( (response) => {
                loading.value = false
                const message = 'Perfil Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else{
        if(usuario.value == "jogador"){
            await axiosPerfil.put('player', JSON.stringify(jogador.value))
            .then( (response) => {
                loading.value = false
                const message = 'Perfil Atualizado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                console.log("error");

                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else{
            console.log(organizador.value);
        }
        }
        if(usuario.value == "organizador" && !editOrg.value ){
            console.log(usuario.value == "organizador");
            console.log("oi");
            loading.value = true
            await axiosPerfil.post('organizer', JSON.stringify(organizador.value))
                .then( (response) => {
                loading.value = false
                const message = 'Perfil Criado!'
                const storageRef = refFB(storage, id + '/orgprofile')
                if(organizador.value.logo){
                    uploadBytes(storageRef, organizador.value.logo)
                }
                const storageRefcapa = refFB(storage, id + '/orgcapa')
                if(organizador.value.capa){
                    uploadBytes(storageRefcapa, organizador.value.capa)
                }

                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                console.log("error");

                createToast(error.response.data.error,{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else if(usuario.value == "organizador"){
            loading.value = true
            await axiosPerfil.put('organizer', JSON.stringify(organizador.value))
                .then( (response) => {
                loading.value = false
                const message = 'Perfil Atualizado!'
                const storageRef = refFB(storage, id + '/orgprofile')
                if(organizador.value.logo){
                    uploadBytes(storageRef, organizador.value.logo)
                }
                const storageRefcapa = refFB(storage, id + '/orgcapa')
                if(organizador.value.capa){
                    uploadBytes(storageRefcapa, organizador.value.capa)
                }

                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);

                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }
    }else{
        
}

}

async function deleteProfile () {
    if(!loading.value){
        loading.value = true
        if(usuario.value == "jogador"){
            await axiosPerfil.delete('player').then( () => {
                loading.value = false
                createToast('Perfil Deletado com sucesso!',{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            }).catch( (erro) => {
                createToast(erro.response.data.error,{
                type : 'danger',
                showIcon : true,
                position : "top-center"
                })
            })
            loading.value = false
        }else{
            await axiosPerfil.delete('organizer').then( () => {
                loading.value = false
                createToast('Perfil Deletado com sucesso!',{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            }).catch( (erro) => {
                createToast(erro.response.data.error,{
                type : 'danger',
                showIcon : true,
                position : "top-center"
                })
            })
            loading.value = false
        }
    }
}



</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 20px;
    }
    .forms{
        display: flex;
        gap: 20px;
    }
    .cadastro{
        background-color: #0005;
        padding: 20px;
        display:  grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width: 60vw;
    }
    .text{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .jogo{
        display: flex;
        gap: 20px;
    }
    .preview{
        min-height: 350px;
        min-width: 400px;
        background-color: #0005;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .jogoInfo{
        display: flex;
        padding-top: 25px;
        gap: 50px;
    }
    .jogoicon{
        display: block;
        background-color: var(--red);
        border-radius: 10px;
        height: fit-content;
        width: fit-content;
        padding: 10px;
    }
    .elo{
        width: 10vw ;
        position: static;
    }
    .jogoicon img{
        width: 10vh;
        filter: brightness(0) saturate(100%)
    }

    .button_div{
        display: flex;
        gap: 20px;
    }
    .button_div img{
        height: 50px;
    }

</style>