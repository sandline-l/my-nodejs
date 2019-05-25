import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      name:'',
      password:'',
    }
  },
  mutations: {
    // 将用户信息存入state 
    saveUser(state,{name,psd}){
      state.user.name = name;
      state.user.password = psd;
    }
  },
  actions: {

  }
})
