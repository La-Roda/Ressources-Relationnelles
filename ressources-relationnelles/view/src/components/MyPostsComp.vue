<template>
  <v-container class="d-flex justify-center">
    <div style="max-width: 550px; width: 100%">
      <h1>Mes publications</h1>
      <v-divider class="mt-3"></v-divider>
      <div v-if="getMyPosts.length !== 0" v-for="post in getMyPosts" :key="post">
        <PostComponent :post="post" :isMine="true"></PostComponent>
      </div>
      <div v-else class="text-center mt-3">
        <span>Vous n'avez encore rien publié !</span>
      </div>
    </div>
  </v-container>
</template>

<script>
import PostComponent from "@/components/posts/post.vue";
import { mapGetters } from "vuex";
export default {
  name: "MyPosts",
  components: {
    PostComponent,
  },
  data() {
    return {
      postTitle: null,
      description: null,
    };
  },
  created() {
    this.$store.dispatch("getMyPosts");
  },
  computed: {
    ...mapGetters(["getMyPosts"]),
  },
};
</script>
