import Cookies from 'js-cookie'

const AudKey = 'aud'
const AuthKey = 'auth'
// const GroupKey = 'group'

//Audience
export function getAud() {
  var aud = Cookies.get(AudKey)
  return aud == null || aud == undefined ? "" : aud
}

export function setAud(aud) {
  return Cookies.set(AudKey, aud)
}

export function removeAud() {
  return Cookies.remove(AudKey)
}

//AuthToken
export function getAuthToken() {
  var auth = Cookies.get(AuthKey)
  return auth == null || auth == undefined ? "" : auth
}

export function setAuthToken(token) {
  return Cookies.set(AuthKey, token)
}

export function removeAuthToken() {
  return Cookies.remove(AuthKey)
}

//Group
// export function getGroup() {
//   return Cookies.get(GroupKey)
// }

// export function setGroup(group) {
//   return Cookies.set(GroupKey, group)
// }

// export function removeGroup() {
//   return Cookies.remove(GroupKey)
// }
