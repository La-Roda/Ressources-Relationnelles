<template>
    <v-container class="login-card">
        <v-card>
            <div class="pa-3 d-flex flex-column">
            <h2 class="mb-3">Se connecter</h2>
                <v-text-field v-model="login" variant="outlined" class="text-input" label="Login"></v-text-field>
                <v-text-field v-model="password" variant="outlined" class="text-input" label="Mot de passe"></v-text-field>
                <v-btn color="#009C9B" class="rounded-pill" @click="initLogin">Se connecter</v-btn>
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
import axios from 'axios'
export default {
    data() {
        return {
            login: null,
            password: null
        }
    },
    methods: {
        async initLogin() {
            // this.$emit('initLogin', this.login, this.password)
            this.$store.dispatch('login', { email: this.login, password: this.password });
  }
        }
}
</script>