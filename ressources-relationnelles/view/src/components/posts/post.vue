<template>
  <v-card class="post my-4 rounded-lg">
    <v-card-title class="pb-0">
      <div class="d-inline-flex">
        <v-img src="@/assets/profil.png" width="30px"></v-img>
        <div class="infos_user d-flex flex-column ml-4 justify-center">
          <span>{{ post.username }}</span>
        </div>
      </div>
    </v-card-title>
    <v-divider class="mt-1"></v-divider>
    <v-card-text class=" post-text d-flex flex-column py-2">
      <h2>{{ title }}</h2>
      <span class="mt-2">{{ description }}</span>
    </v-card-text>
    <v-btn
      variant="text"
      icon="mdi-heart"
      color="#009C9B"
      @click="initDislike"
      v-if="isLiked"
    ></v-btn>
    <v-btn
      variant="text"
      icon="mdi-heart-outline"
      color="#009C9B"
      @click="initLike"
      v-else
    ></v-btn>

    <v-dialog v-if="isMine" max-width="550px" width="90%" v-model="dialogEdit">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          icon="mdi-message-draw"
          color="#009C9B"
          v-bind="props"
        ></v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <h2>Modifier son post</h2>
            <v-text-field
              :rules="test"
              class="mt-3"
              outlined
              label="Donnez un titre à votre publication"
              name="title"
              v-model="edittedPostTitle"
            >
            </v-text-field>
            <v-textarea
              required
              label="Ecrivez ce que vous avez à dire"
              v-model="edittedPostContent"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn color="#009C9B" class="rounded-pill" @click="dialogEdit = false"
            >Annuler</v-btn
          >
          <v-btn color="#009C9B" class="rounded-pill" @click="editPost()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="isMine" max-width="550px" width="90%" v-model="dialogDelete">
      <template v-slot:activator="{ props }">
        <v-btn
          class="delete_button"
          variant="text"
          icon="mdi-close"
          color="#009C9B"
          v-bind="props"
        ></v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <h2 class="text-center">Etes vous sur de vouloir supprimer votre post ?</h2>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn color="#009C9B" class="rounded-pill" @click="dialogDelete = false"
            >Non</v-btn
          >
          <v-btn color="#009C9B" class="rounded-pill" @click="deletePost()">Oui</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<style>
.v-card-title {
  line-height: 1 !important;
}
</style>
<style scoped>
.post {
  max-width: 750px;
  width: 100%;
}

.infos_user .date {
  font-size: 12px;
  color: grey;
}
.delete_button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true,
    },
    isMine: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isliked: this.isLiked,
      title: this.post.title,
      description: this.post.field,
      dialogEdit: false,
      dialogDelete: false,
      edittedPostTitle: this.post.title,
      edittedPostContent: this.post.field,
    };
  },
  computed: {
    ...mapGetters(["getUser", "getLikes"]),
    isLiked() {
      for (const val of this.getLikes.data) {
        if (val.id === this.post.id) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    async editPost() {
      await axios.put("http://localhost:3000/posts/update", {
        id_user: this.getUser.id,
        id_post: this.post.id,
        title: this.edittedPostTitle,
        field: this.edittedPostContent,
      });
      // (this.title = this.edittedPostTitle),
      // (this.description = this.edittedPostContent),
      // (this.dialogEdit = false)
      this.$store.dispatch("getMyPosts");
    },
    async deletePost() {
      await axios.post("http://localhost:3000/posts/delete", {
        id_post: this.post.id,
      });
      this.$store.dispatch("getMyPosts");
    },
    async initLike() {
      await axios.post("http://localhost:3000/posts/like", {
        id_post: this.post.id,
        id_user: this.getUser.id,
      });
      this.$store.dispatch("getLikes");
    },
    async initDislike() {
      await axios.post("http://localhost:3000/posts/dislike", {
        id_post: this.post.id,
        id_user: this.getUser.id,
      });
      this.$store.dispatch("getLikes");
    },
  },
};
</script>
