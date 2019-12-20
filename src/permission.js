import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getAud, getAuthToken, getGroup } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/homepage', '/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasAud = getAud()
  // const hasAuth = getAuthToken()
  const group = getGroup()

  if (group && group >= 10) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const show = store.getters.show
      if (show) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes', group)
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          store.dispatch('app/toggleShow', 1)
        } catch (error) {
          await store.dispatch('user/resetAuth')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no auth info */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      await store.dispatch('user/logout')
      router.push('/homepage')
      // next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
