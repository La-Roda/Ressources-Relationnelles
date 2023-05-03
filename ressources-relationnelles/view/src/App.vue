<template>
  <logged-out v-if="getToken === null"></logged-out>
  <defaultLayout v-else></defaultLayout>
</template>
<style>

</style>
<script>
import loggedOut from './layouts/logged-out.vue'
import defaultLayout from './layouts/default-layout.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    loggedOut,
    defaultLayout
  },
  data() {
        return {
            cookieAuth: null
        }
  },
  computed:{
    ...mapGetters(['getToken'])
  }
}
</script>
