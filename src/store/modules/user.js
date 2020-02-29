import { login, logout, getInfo } from '@/api/user'
import { getAud, setAud, removeAud, getAuthToken, setAuthToken, removeAuthToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  aud: getAud(),
  auth: getAuthToken(),
  group: '',
  uname: '',
  avatar: '',
  uscc: '',
  mobile: '',
  email: '',
  uid: '',
  cid: '',
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
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_UNAME: (state, uname) => {
    state.uname = uname
  },
  SET_CID: (state, cid) => {
    state.cid = cid
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USCC: (state, uscc) => {
    state.uscc = uscc
  }
}

const actions = {

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { status, data } = response.data
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { uid, username, avatar, mobile, email, cid, uscc, group, create_date } = data
        commit('SET_UID', uid)
        commit('SET_UNAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_USCC', uscc)
        commit('SET_MOBILE', mobile)
        commit('SET_EMAIL', email)
        commit('SET_CID', cid)
        commit('SET_GROUP', group)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  login({ commit }, data) {
    const { username, password } = data
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_AUD', response.headers["audience"])
        setAud(response.headers["audience"])
        commit('SET_AUTH', response.headers["authorization"])
        setAuthToken(response.headers["authorization"])
        // commit('SET_GROUP', response.headers["group"])
        // setGroup(response.headers["group"])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
      commit('SET_AUD', '')
      commit('SET_AUTH', '')
      commit('SET_GROUP', '')
      // commit('SET_ROLES', [])
      removeAud()
      removeAuthToken()
      resetRouter()
    })
  },

  // remove auth info
  resetAuth({ commit }) {
    return new Promise(resolve => {
      commit('SET_AUD', '')
      commit('SET_AUTH', '')
      commit('SET_GROUP', '')
      removeAud()
      removeAuthToken()
      // removeGroup()
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

