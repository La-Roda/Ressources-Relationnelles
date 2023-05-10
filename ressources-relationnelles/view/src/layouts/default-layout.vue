<template>
  <v-app>
    <v-app-bar elevation="1">
      <headerComponent @showDrawer="showDrawer = !showDrawer"></headerComponent>
    </v-app-bar>
    <v-navigation-drawer v-model="showDrawer" temporary>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-account"
          class="font-weight-bold menu-item"
          title="Mon compte"
          value="account"
          @click="redirect('account')"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-bookmark"
          class="font-weight-bold menu-item"
          title="Mon fil d'actualité"
          value="fil"
          @click="redirect('home')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-message-text-outline"
          class="font-weight-bold menu-item"
          title="Mes posts"
          value="myposts"
          @click="redirect('myposts')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background-color: #eceff4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<style scoped>
.menu-item:deep(.v-list-item-title) {
  font-size: 16px !important;
  font-weight: 700;
}
</style>
<script>
import headerComponent from "../components/header.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "default-layout",
  components: {
    headerComponent,
  },
  created() {},
  data() {
    return {
      showDrawer: false,
      cookieAuth: null,
    };
  },
  methods: {
    redirect(page) {
      this.$router.push({ name: page });
    },
  },
});
</script>
