<template>
  <v-container v-if="isLogin" class="login-card">
    <v-card>
      <div class="pa-3 d-flex flex-column">
        <h2 class="mb-3">Se connecter</h2>
        <v-text-field
          v-model="login"
          variant="outlined"
          class="text-input"
          label="Login"
          name="login"
        ></v-text-field>
        <v-text-field
          v-model="password"
          variant="outlined"
          type="password"
          class="text-input"
          label="Mot de passe"
          name="password"
        ></v-text-field>
        <v-btn color="#009C9B" class="rounded-pill login" @click="initLogin"
          >Se connecter</v-btn
        >
        <span class="mt-3 text-center"
          >Vous n'avez pas de compte ? <a @click="isLogin = false">Créez en un !</a></span
        >
      </div>
    </v-card>
  </v-container>
  <v-container v-else class="login-card">
    <v-card>
      <div class="pa-3 d-flex flex-column">
        <h2 class="mb-3">Créer un compte</h2>
        <v-text-field
          v-model="nom"
          variant="outlined"
          class="text-input"
          label="Nom"
          name="nom"
        ></v-text-field>
        <v-text-field
          v-model="prenom"
          variant="outlined"
          type="text"
          class="text-input"
          label="Prénom"
          name="prenom"
        ></v-text-field>
        <v-text-field
          v-model="pseudo"
          variant="outlined"
          type="text"
          class="text-input"
          label="Pseudo"
          name="pseudo"
        ></v-text-field>
        <v-text-field
          v-model="email"
          variant="outlined"
          type="email"
          class="text-input"
          label="Email"
          name="email"
        ></v-text-field>
        <v-text-field
          v-model="registerPassword"
          variant="outlined"
          type="password"
          class="text-input"
          label="Mot de passe"
          name="registerPassword"
        ></v-text-field>
        <v-select
          variant="outlined"
          v-model="sexe"
          label="Sexe"
          name="sexe"
          :items="['Homme', 'Femme', 'Autre']"
        ></v-select>
        <div>
          <VueDatePicker v-model="date"></VueDatePicker>
        </div>
        <v-btn color="#009C9B" class="rounded-pill register mt-3" @click="initRegister"
          >Créer un compte</v-btn
        >
        <span class="mt-3 text-center"
          >Vous avez déjà un compte ?
          <a @click="isLogin = true">Connectez-vous !</a></span
        >
      </div>
    </v-card>
  </v-container>
</template>

<style>
.login-card {
  max-width: 500px;
  overflow-y: visible;
}
a {
  color: #009c9b;
}
a:hover {
  cursor: pointer;
}
</style>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";

export default {
  components: {
    VueDatePicker,
  },
  data() {
    return {
      login: null,
      password: null,
      isLogin: true,
      date: null,
      nom: null,
      prenom: null,
      pseudo: null,
      email: null,
      registerPassword: null,
      sexe: null,
    };
  },
  methods: {
    async initLogin() {
      // this.$emit('initLogin', this.login, this.password)
      await this.$store.dispatch("login", { email: this.login, password: this.password });
      this.$store.dispatch("getPosts");
      this.$store.dispatch("getLikes");
    },
    async initRegister() {
      // this.$emit('initLogin', this.login, this.password)
      const register = await axios.post("http://localhost:3000/authentication/register", {
        lastname: this.nom,
        firstname: this.prenom,
        username: this.pseudo,
        email: this.email,
        password: this.registerPassword,
        sex: this.sexe,
        birthday: this.date,
      });
      if (register.status === 200) {
        this.isLogin = true;
      }
    },
  },
};
</script>
