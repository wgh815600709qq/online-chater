const user = {
  state: {
    token: '' // 登陆之后返回
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
    }
  },
  actions: {
    setToken ({commit}, data) {
      commit('SET_TOKEN', data)
    }
  }
}
export default user
