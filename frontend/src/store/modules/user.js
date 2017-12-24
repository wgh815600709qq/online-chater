import lockr from 'lockr'
const user = {
  state: {
    token: '' || lockr.get('token'), // 登陆之后返回
    myInfo: null || lockr.get('userInfo') // 个人信息
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
      lockr.set('token', data)
    },
    SET_MYINFO: (state, data) => {
      state.myInfo = data
      lockr.set('userInfo', data)
    }
  },
  actions: {
    setToken ({commit}, data) {
      commit('SET_TOKEN', data)
    },
    setMyInfo ({commit}, data) {
      commit('SET_MYINFO', data)
    }
  }
}
export default user
