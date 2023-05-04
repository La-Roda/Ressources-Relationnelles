import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

export default createStore({
  state: {
    token: null,
    user: {},
    posts:{}
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getPosts(state) {
      return state.posts;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/authentication/login', { email, password });
        const token = response.data.token;
        commit('setToken', token);
        router.push('/home')
      } catch (error) {
        throw(error)
      }
    },
    async getPosts({ commit }) {
     const posts = [
        {    "username": "Alice",    "title": "My first post",    "content": "Hello everyone, this is my first post on this social network!"  },
        {    "username": "Bob",    "title": "A beautiful day",    "content": "Today is such a beautiful day! I'm going for a walk in the park."  }, 
         {    "username": "Charlie",    "title": "New job",    "content": "I'm so excited to start my new job next week! Wish me luck."  }, 
          {    "username": "Alice",    "title": "My favorite book",    "content": "I just finished reading 'To Kill a Mockingbird' and it's now my favorite book ever!"  },
            {    "username": "Bob",    "title": "Favorite movie",    "content": "I watched 'The Godfather' last night and it's definitely my favorite movie of all time."  }, 
             {    "username": "Charlie",    "title": "Travel plans",    "content": "I'm planning a trip to Europe next year. Any recommendations?"  }
            ]
     
            commit('setPosts', posts);
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
