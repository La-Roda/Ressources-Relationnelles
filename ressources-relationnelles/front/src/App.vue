<template>
  <v-app>
  <v-app-bar color="#009C9B">
    <headerComponent></headerComponent>
  </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>
<style>

</style>
<script>
import headerComponent from './components/header.vue';
export default {
  name: 'App',
  components: {
    headerComponent
  },
  data () {
    return {
      //
    }
  },
}
</script>
