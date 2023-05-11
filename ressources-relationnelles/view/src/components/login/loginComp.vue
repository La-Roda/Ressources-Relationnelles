<template>
  <v-container v-if="isLogin" class="login-card">
    <v-card>
      <div class="pa-3 d-flex flex-column">
        <h2 class="mb-3">Se connecter</h2>
        <v-divider width="100%"></v-divider>
        <v-text-field
          v-model="login"
          variant="outlined"
          class="text-input"
          label="Login"
          hide-details="true"
          name="login"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          variant="outlined"
          type="password"
          class="text-input"
          label="Mot de passe"
          hide-details="true"
          clearable
          name="password"
        ></v-text-field>
        <v-btn
            color="#009C9B"
            variant="tonal"
            class="rounded-lg mt-4"
            width="100%"
            height="40px"
            @click="initLogin"
            >Se connecter</v-btn
          >
        <span class="mt-3 text-center"
          >Vous n'avez pas de compte ? <a @click="isLogin = false">Créez en un !</a></span
        >
      </div>
    </v-card>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      :color="snackbarColor"
      content-class="snackbar"
    >
    {{ snackbarMessage }}
  </v-snackbar>
  </v-container>
  <v-container v-else class="login-card">
    <v-card>
      <div class="pa-3 d-flex flex-column">
        <h2 class="mb-3">Créer un compte</h2>
        <v-divider width="100%"></v-divider>
        <v-text-field
          v-model="nom"
          density="compact"
          hide-details="true"
          variant="outlined"
          class="text-input"
          label="Nom"
          name="nom"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="prenom"
          density="compact"
          hide-details="true"
          variant="outlined"
          type="text"
          class="text-input"
          label="Prénom"
          name="prenom"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="pseudo"
          density="compact"
          hide-details="true"
          variant="outlined"
          type="text"
          class="text-input"
          label="Pseudo"
          name="pseudo"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="email"
          density="compact"
          hide-details="true"
          variant="outlined"
          type="email"
          class="text-input"
          label="Email"
          name="email"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="registerPassword"
          density="compact"
          hide-details="true"
          variant="outlined"
          type="password"
          class="text-input"
          label="Mot de passe"
          name="registerPassword"
          clearable
        ></v-text-field>
        <v-select
          variant="outlined"
          density="compact"
          class="text-input"
          hide-details="true"
          v-model="sexe"
          label="Sexe"
          name="sexe"
          :items="['Homme', 'Femme', 'Autre']"
          
        ></v-select>
        <div>
          <VueDatePicker class="text-input date-picker" v-model="date" :enable-time-picker="false">
            <template #input-icon>
              <v-icon class="ml-2">mdi-calendar</v-icon>
            </template>
          </VueDatePicker>
        </div>
        <v-btn
            color="#009C9B"
            variant="tonal"
            class="rounded-lg mt-1"
            width="100%"
            height="40px"
            @click="initRegister"
            >Créer un compte</v-btn
          >
        <span class="mt-3 text-center"
          >Vous avez déjà un compte ?
          <a @click="isLogin = true">Connectez-vous !</a></span
        >
      </div>
    </v-card>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      :color="snackbarColor"
      content-class="snackbar"
    >
    {{ snackbarMessage }}
  </v-snackbar>
  </v-container>
</template>

<style>
.login-card {
  max-width: 500px;
  overflow-y: visible;
}
.v-snackbar__content{
  text-align: center !important;
}
.text-input{
  margin-top: 15px;
}
.date-picker {
  height: 50px !important;
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
      snackbarMessage: null,
      showSnackbar: false,
      snackbarColor: null
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
      }).then()
      .catch((e) => {
        this.snackbarMessage = "Erreur côté serveur"
        this.showSnackbar = true
        this.snackbarColor = "error"
      }) ;
      if (register.status === 200) {
        this.isLogin = true;
        this.snackbarMessage = "Votre compté à bien été créé !"
        this.showSnackbar = true
        this.snackbarColor = "success"
      }
    },
  },
};
</script>
