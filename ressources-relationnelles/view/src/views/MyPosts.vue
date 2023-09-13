<template>
  <MyPostsComp></MyPostsComp>
</template>

<script>
import MyPostsComp from "@/components/MyPostsComp.vue";
import { mapGetters } from "vuex";
export default {
  name: "MyPosts",
  components: {
    MyPostsComp,
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
