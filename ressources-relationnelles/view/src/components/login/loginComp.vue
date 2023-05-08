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
        <a @click="isLogin = false">Vous n'avez pas de compte ? Créez en un !</a>
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
        <a @click="isLogin = true">Vous avez deja un compte ? Connectez vous !</a>
      </div>
    </v-card>
  </v-container>
</template>

<style>
.login-card {
  max-width: 500px;
  overflow-y: visible;
}
.text-input {
}
</style>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
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
    },
    async initRegister() {
      // this.$emit('initLogin', this.login, this.password)
      await this.$store.dispatch("register", {
        lastname: this.nom,
        firstname: this.prenom,
        username: this.pseudo,
        email: this.email,
        password: this.registerPassword,
        sex: this.sexe,
        birthday: this.date,
      });
    },
  },
};
</script>
