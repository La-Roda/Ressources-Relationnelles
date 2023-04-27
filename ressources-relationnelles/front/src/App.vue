<template>
  <logged-out v-if="!cookieAuth"></logged-out>
  <defaultLayout v-else></defaultLayout>
</template>
<style>

</style>
<script>
import loggedOut from './layouts/logged-out.vue'
import defaultLayout from './layouts/default-layout.vue'

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
}
</script>
