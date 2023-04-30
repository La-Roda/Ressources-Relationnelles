import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: null,
    user: {}
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        const token = response.data.token;
        commit('setToken', token);
      } catch (error) {
        console.error(error);
      }
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
