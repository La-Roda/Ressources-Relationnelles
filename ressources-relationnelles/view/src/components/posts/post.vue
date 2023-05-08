<template>
  <v-card class="post mx-4 ma-2">
    <v-card-title class="pb-0">
      <div class="d-inline-flex">
        <v-img src="@/assets/profil.png" width="30px"></v-img>
        <div class="infos_user d-flex flex-column ml-4">
          <span>{{ post.username }}</span>
          <span class="date mt-1"> Il y a 19h </span>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="mt-3 post-text d-flex flex-column">
      <h2>{{ post.title }}</h2>
      <span>{{ post.field }}</span>
    </v-card-text>
    <v-btn variant="text" icon="mdi-heart-outline" color="#009C9B"></v-btn>

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
          <v-btn color="#009C9B" class="rounded-pill" @click="test()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="isMine" max-width="550px" width="90%" v-model="dialogDelete">
      <template v-slot:activator="{ props }">
        <v-btn variant="text" icon="mdi-close" color="#009C9B" v-bind="props"></v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <h2>Etes vous sur de vouloir supprimer votre post ?</h2>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn color="#009C9B" class="rounded-pill" @click="dialogDelete = false"
            >Non</v-btn
          >
          <v-btn color="#009C9B" class="rounded-pill" @click="test()">Oui</v-btn>
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
  background-color: #efefef;
}

.infos_user .date {
  font-size: 12px;
  color: grey;
}
</style>
<script>
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
      isliked: false,
      dialogEdit: false,
      dialogDelete: false,
      edittedPostTitle: this.post.title,
      edittedPostContent: this.post.content,
    };
  },
  watch: {
    edittedPost(val) {
      console.log(val);
    },
  },
  methods: {
    test() {
      console.log(this.edittedPost);
    },
  },
};
</script>
