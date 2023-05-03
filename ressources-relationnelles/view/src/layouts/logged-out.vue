<template>
    <v-app>
        <v-app-bar color="#009C9B">
            <headerComponent></headerComponent>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import headerComponent from '../components/header.vue';

import { defineComponent } from "vue";

export default defineComponent({
    components: {
        headerComponent
    },
    name: 'logged-out',
})
</script>