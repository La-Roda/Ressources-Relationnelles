import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    token: null,
    user: {},
    posts:{},
    myPosts: {}
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getPosts(state) {
      return state.posts.data;
    },
    getMyPosts(state) {
      return state.myPosts;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setMyPosts(state, posts) {
      state.myPosts = posts;
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/authentication/login', { email, password });
        commit('setToken', response.data.id);
        commit('setUser', response.data);
        router.push('/home')
      } catch (error) {
        throw(error)
      }
    },
    async getPosts({ commit }) {
     const posts = await axios.get('http://localhost:3000/posts/get');
     console.log(posts)
      commit('setPosts', posts);
    },
    async getMyPosts({ commit }) {
      const posts = [
         {    "username": "Chris",    "title": "My first post",    "content": "Hello everyone, this is my first post on this social network!"  },
         {    "username": "Adrien",    "title": "A beautiful day",    "content": "Today is such a beautiful day! I'm going for a walk in the park."  }, 
          {    "username": "Theo",    "title": "New job",    "content": "I'm so excited to start my new job next week! Wish me luck."  }, 
           {    "username": "Alexis",    "title": "My favorite book",    "content": "I just finished reading 'To Kill a Mockingbird' and it's now my favorite book ever!"  },
             {    "username": "Bob",    "title": "Favorite movie",    "content": "I watched 'The Godfather' last night and it's definitely my favorite movie of all time."  }, 
              {    "username": "Charlie",    "title": "Travel plans",    "content": "I'm planning a trip to Europe next year. Any recommendations?"  }
             ]
      
             commit('setMyPosts', posts);
     }
    // async getUser({commit, state}) {
    //   const user = await this.$httpBuilder()
    //   .addParam(['authentification', 'user'])
    //   .send();
    // }
  },
  modules: {
  }
})
