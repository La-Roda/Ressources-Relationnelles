<template>
    <v-container style="max-width: 550px; width: 100%" class="d-flex flex-column align-center">
        <div>
            <v-img :src="require('../assets/profil.png')" width="100px"></v-img>
        </div>
        <v-divider class="mt-3"  width="100%"></v-divider>
        <div class="mt-3">
            <h1>{{ getUser.username }}</h1>
        </div>
        <v-divider class="mt-3" width="100%"></v-divider>
        <div class="mt-3" style="width: 100%" width="100%">
            <h2 class="ml-4">Vos informations :</h2>
            <div class="mt-5 ml-5">
                <v-row>
                    <v-col cols="3"><b>Nom :</b> </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>{{ getUser.lastname }}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="3"><b>Prénom :</b> </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>{{ getUser.firstname }}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="3"><b>E-mail :</b> </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>{{ getUser.email }}</v-col>
                </v-row>
        </div>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getUser'])
    }
}
</script>