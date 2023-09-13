import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

export default createStore({
  state: {
    token: null,
    user: {},
    posts: {},
    myPosts: {},
    likes: {},
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getPosts(state) {
      return state.posts.data;
    },
    getLikes(state) {
      return state.likes;
    },
    getMyPosts(state) {
      return state.myPosts.data;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLikes(state, likes) {
      state.likes = likes;
    },
    setMyPosts(state, posts) {
      state.myPosts = posts;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(
          "http://localhost:3000/authentication/login",
          { email, password }
        );
        commit("setToken", response.data.id);
        commit("setUser", response.data);
        router.push("/home");
      } catch (error) {
        throw error;
      }
    },
    async getPosts({ commit }) {
      const posts = await axios.get("http://localhost:3000/posts/get");
      commit("setPosts", posts);
    },
    async getMyPosts({ commit }) {
      const posts = await axios.get("http://localhost:3000/posts/myposts", {
        params: { id_user: this.state.user.id },
      });
      commit("setMyPosts", posts);
    },
    async getLikes({ commit }) {
      const posts = await axios.get("http://localhost:3000/posts/getlikes", {
        params: { id_user: this.state.user.id },
      });
      commit("setLikes", posts);
    },
    // async getUser({commit, state}) {
    //   const user = await this.$httpBuilder()
    //   .addParam(['authentification', 'user'])
    //   .send();
    // }
  },
  modules: {},
});
