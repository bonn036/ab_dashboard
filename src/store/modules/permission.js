import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param group
 * @param route
 */
function hasPermission(group, route) {
  if (route.meta && route.meta.group) {
    // return group.some(group => route.meta.group.includes(group))
    return route.meta.group == group
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param group
 */
export function filterAsyncRoutes(routes, group) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(group, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, group)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, group) {
    return new Promise(resolve => {
      let accessedRoutes
      if (group == 36) {
      // if (group.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, group)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
