<template>
  <form class="form" autocomplete="off" @submit.prevent="handleSubmit($event)">
    <div class="first">
      <div class="cadastro">
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.nome_usuario"
          label="NOME DE USUARIO:" maxlength="30" autofocus required />
        <new-input-form icon="https://img.icons8.com/ios-filled/100/new-post.png" v-model="cadastro.email" label="EMAIL:"
          type="email" required />
        <new-input-form ref="senha" icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="cadastro.senha"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Precisa conter pelo menos um numero, uma letra maiuscula e minuscula e ao menos 8 caracteres"
          label="SENHA:" type="password" required />
        <div>
          <new-input-form icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="confPassword"
            label="CONFIRMAR SENHA:" type="password" required />
          <p class="awarn" v-if="cadastro.senha != confPassword && confPassword != ''">AS SENHAS NÃO SÃO IDENTICAS!</p>
        </div>
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.nome_completo"
          pattern="[A-Za-z\s]+" title="Não pode possuir numeros" label="NOME COMPLETO:" maxlength="50" optional />
        <new-input-form icon="https://img.icons8.com/ios-filled/100/planner.png" v-model="cadastro.data_nascimento"
          label="DATA DE NASCIMENTO:" type="date" min="1900-01-02" required />
        <div>
          <span class="title">GÊNERO:</span>
          <div class="genero">
            <FormRatio id="Masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" name="genero"
              :value="0" v-model="cadastro.genero" />
            <FormRatio id="Feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" name="genero"
              :value="1" v-model="cadastro.genero" />
            <FormRatio id="Outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" name="genero"
              :value="2" v-model="cadastro.genero" checked />
          </div>
        </div>
        <new-input-form v-model="cadastro.nickname" label="NICKNAME:" required />

      </div>

    </div>
    <div class="second">
      <div class="submit">
        <ImageUpload id="profilePic" v-model="cadastro.foto_perfil" />
        <span class="title">BIO:</span>
        <textarea name="" v-model="cadastro.biografia" id="" maxlength="300" placeholder="Bio..."></textarea>
      </div>
      <div class="end">
        <p class="awarnResponse" v-if="errorLogin">Email ou Nome de Usuario já cadastrado!</p>
        <div class="cadastrar">
          <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          <NewCustomButton label="CADASTRAR" size="1.5vw" type="submit" />
        </div>
      </div>
    </div>

  </form>
</template>


<script setup>
import { ref } from "vue";
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';
import NewInputForm from "./NewInputForm.vue";
import NewCustomButton from "../NewCustomButton.vue";
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import router from "../../router";
import storage from '../../firebase/firebase.js'
import { ref as refFB, uploadBytes } from 'firebase/storage'
import { loginRest, signupRest } from "./api";

const confPassword = ref("");
const cadastro = ref({
  nome_usuario: "",
  nome_completo: "",
  email: "",
  senha: "",
  data_nascimento: "",
  genero: 2,
  nickname: "",
  biografia: ""
});
const loading = ref(false);
const errorLogin = ref(false);
const form = ref({
  souJogador: true,
  souOrganizador: false
});




const handleSubmit = async () => {
  if (cadastro.value.senha !== confPassword.value && confPassword.value !== "") {
    window.scrollTo(0, 0);
  } else {
    loading.value = true;
    errorLogin.value = false;

    try {
      // Cadastro no seu servidor
      const responseCadastro = await axiosPerfil.post('register', JSON.stringify(cadastro.value));

      // Lógica de login no ChatEngine (substitua pela sua implementação)
      await loginChatEngine(
        cadastro.value.nome_usuario,
        cadastro.value.senha,
        cadastro.value.email,
        cadastro.value.nome_completo
      );

      // Restante do seu código...

      loading.value = false;

      const storageRef = refFB(storage, responseCadastro.data.id + '/profile');
      if (cadastro.value.foto_perfil) {
        uploadBytes(storageRef, cadastro.value.foto_perfil);
      }

      createToast('Cadastrado com sucesso!', {
        type: 'success',
        showIcon: true,
        position: "top-center"
      });

      router.push('/login');

    } catch (error) {
      loading.value = false;
      console.error(error);

      if (error.response && error.response.status === 400) {
        errorLogin.value = true;
        createToast('Email ou Nome de Usuario já cadastrado!', {
          type: 'warning',
          showIcon: true,
          position: "top-center"
        });
      } else if (error.code === "ERR_NETWORK" || (error.response && error.response.status === 500)) {
        createToast('Erro interno, Tente novamente!', {
          type: 'danger',
          showIcon: true,
          position: "top-center"
        });
      }
    }
  }
}

</script>

<style scoped>
.form {
  padding: 20px 20px 0px 20px;
  display: grid;
  column-gap: 5%;
  grid-template-columns: 1fr 30vw;
}

.title {
  font-weight: 900;
  font-size: var(--font-text);
}

.forms {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100px;
}

.cadastro {
  width: 100%;
  height: 63vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  gap: 20px;
  padding: 50px;
  background-color: #0005;
}

.genero {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.jogo {
  display: flex;
  gap: 15px;
  width: 100%;
}

.submit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
  height: 63vh;
  background-color: #0005;
}

.awarn {
  color: var(--red);
}

.second {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.cadastrar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.cadastrar img {
  height: 7vh;
}

.awarnResponse {
  color: var(--red);
}

.end {
  display: flex;
}</style>