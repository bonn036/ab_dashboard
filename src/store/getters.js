const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  aud: state => state.user.aud,
  auth: state => state.user.auth,
  group: state => state.user.group,
  uid: state => state.user.uid,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  avatar: state => state.user.avatar,
  cid: state => state.user.cid,
  cdatetime: state => state.user.cdatetime,
  permission_routes: state => state.permission.routes
}
export default getters
