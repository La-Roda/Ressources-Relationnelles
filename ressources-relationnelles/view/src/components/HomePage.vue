<template>
  <div class="d-flex justify-center ma-3 mt-5">
    <div style="max-width: 550px; width: 100%">
      <h1>Mon fil d'actualité</h1>
      <v-divider class="mt-2"></v-divider>
      <v-dialog class="d-flex justify-center" width="100%" v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="#009C9B"
            variant="tonal"
            prepend-icon="mdi-note"
            class="rounded-lg my-5"
            width="100%"
            height="60px"
            >Nouvelle publication</v-btn
          >
        </template>
        <v-card max-width="550px" width="100%" class="ma-auto">
          <v-card-text>
            <v-container>
              <h2>Publier un nouveau post</h2>
              <v-text-field
                :rules="test"
                class="mt-3"
                outlined
                label="Donnez un titre à votre publication"
                name="title"
                v-model="postTitle"
              >
              </v-text-field>
              <v-textarea
                v-model="description"
                required
                label="Ecrivez ce que vous avez à dire"
              ></v-textarea>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-around">
            <v-btn color="#009C9B" class="rounded-pill" @click="dialog = false"
              >Annuler</v-btn
            >
            <v-btn color="#009C9B" class="rounded-pill" @click="initSendPost()"
              >Valider</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider class="mb-5"></v-divider>
      <div v-if="getPosts.length !== 0" v-for="post in getPosts" :key="post">
        <PostComponent :post="post" :isMine="false"></PostComponent>
      </div>
      <div v-else class="text-center">
        <span>Il n'y a aucune publication à vous montrer</span>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/posts/post.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    PostComponent,
  },
  data() {
    return {
      dialog: false,
      postTitle: null,
      description: null,
      test: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  computed: {
    ...mapGetters(["getPosts", "getUser"]),
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    async initSendPost() {
      await axios.post("http://localhost:3000/posts/create", {
        id: this.getUser.id,
        title: this.postTitle,
        description: this.description,
      });
      this.dialog = false;
      this.$store.dispatch("getPosts");
    },
  },
};
</script>
