import { login, logout, getInfo } from '@/api/user'
import { getAud, setAud, removeAud, getAuthToken, setAuthToken, removeAuthToken, getGroup, setGroup, removeGroup} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  aud: getAud(),
  auth: getAuthToken(),
  group: getGroup(),
  name: '',
  avatar: '',
  mobile: '',
  // roles: []
}

const mutations = {
  SET_AUD: (state, aud) => {
    state.aud = aud
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth
  },
  SET_GROUP: (state, group) => {
    state.group = group
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_AUD', data.aud)
        setAud(data.aud)
        commit('SET_AUTH', data.auth)
        setAuthToken(data.auth)
        commit('SET_GROUP', data.group)
        setGroup(data.group)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, mobile } = data

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_MOBILE', mobile)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_AUD', '')
        commit('SET_AUTH', '')
        commit('SET_GROUP', '')
        // commit('SET_ROLES', [])
        removeAud()
        removeAuthToken()
        removeGroup()

        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_AUD', '')
      commit('SET_AUTH', '')
      commit('SET_GROUP', '')
      removeAud()
      removeAuthToken()
      removeGroup()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

