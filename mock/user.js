
const users = {
  admin: {
    aud: 'admin',
    auth: 'admin-token',
    group: 1,
    name: 'James',
    mobile: '133333333',
    cid: '101101011'
  },
  user: {
    aud: 'user',
    auth: 'user-token',
    group: 0,
    name: 'Cheng',
    mobile: '133333333',
    cid: '1011010112'
  }
}

const userInfo = {
  'admin-token': {
    uid: 1000110,
    username: 'james',
    mobile: '13599898998',
    email: '',
    cid: '110101199810011011',
    group: 1,
    create_date: '2018-05-15',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    status: 1,
    uscc: '91110108MA01C5QM22',
  },
  'user-token': {
    uid: 1000111,
    username: 'Cheng',
    mobile: '1369100119',
    email: '',
    cid: '110102200108012008',
    group: 10,
    create_date: '2018-06-18',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    status: 1,
    uscc: '91110108MA01C5QM24',
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: (req, res) => {
      const { username } = req.body
      const user = users[username]
      // mock error
      if (!user) {
        return {
          status: 400,
          message: 'Account and password are incorrect.'
        }
      }
      res.header('audience', user['aud'])
      res.header('authorization', user['auth'])
      res.header('group', user['group'])
      return {
        status: 200,
        data: user
      }
    }
  },
  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: req => {
      const auth = req.headers['authorization']
      const info = userInfo[auth]
      // mock error
      if (!info) {
        return {
          status: 50008,
          message: 'Login failed, unable to get user details. '
        }
      }
      return {
        status: 200,
        data: info
      }
    }
  },
  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: (req, res) => {
      res.header('audience', '')
      res.header('authorization', '')
      res.header('group', '')
      return {
        status: 200,
        data: 'success'
      }
    }
  }
]
