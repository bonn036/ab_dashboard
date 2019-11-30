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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_CID: (state, cid) => {
    state.cid = cid
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
        commit('SET_AUD', response.headers["audience"])
        setAud(response.headers["audience"])
        commit('SET_AUTH', response.headers["authorization"])
        setAuthToken(response.headers["authorization"])
        commit('SET_GROUP', response.headers["group"])
        setGroup(response.headers["group"])
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
        const { status, users } = response.data
        if (!users || users.length == 0) {
          reject('Verification failed, please Login again.')
        }
        const { uid, username, mobile, email, cid } = users[0]
        commit('SET_UID', uid)
        commit('SET_NAME', username)
        // commit('SET_AVATAR', avatar)
        commit('SET_MOBILE', mobile)
        commit('SET_EMAIL', email)
        commit('SET_CID', cid)
        resolve(users)
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

  // remove auth info
  resetAuth({ commit }) {
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

