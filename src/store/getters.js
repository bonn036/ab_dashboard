const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  show: state => state.app.show,
  aud: state => state.user.aud,
  auth: state => state.user.auth,
  group: state => state.user.group,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes
}
export default getters
