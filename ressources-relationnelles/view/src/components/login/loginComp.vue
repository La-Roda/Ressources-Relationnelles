<template>

  <v-container class="login-card">
    <v-card>
      <div class="pa-3 d-flex flex-column">
        <h2 class="mb-3">Se connecter test</h2>
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
        <v-btn color="#009C9B" class="rounded-pill" @click="initLogin"
          >Se connecter</v-btn
        >
      </div>
    </v-card>

  </v-container>
</template>

<style>
.login-card {
  max-width: 500px;
}
.text-input {
}
</style>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";

export default {
  data() {
    return {
      login: null,
      password: null,
    };
  },
  methods: {
    async initLogin() {
      // this.$emit('initLogin', this.login, this.password)
      await this.$store.dispatch("login", {
        email: this.login,
        password: this.password,
      });
      this.$store.dispatch("getPosts");
    },
  },
};
</script>
