import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDbem797aGgigcw-zisSm4aGPiRv7x-gik',
  authDomain: 'carona-sustentavel.firebaseapp.com',
  projectId: 'carona-sustentavel',
  storageBucket: 'carona-sustentavel.appspot.com',
  messagingSenderId: '916411979192',
  appId: '1:916411979192:web:4291f307ee7fd9f903ab4d',
  measurementId: 'G-6N4NCJ157V'
}

export default boot(async ({ router, app, Vue }) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const redirect = urlParams.get('redirect')
  window.app = initializeApp(firebaseConfig)
  const auth = getAuth()
  Vue.prototype.$auth = auth
  window.dbfunctions = getFunctions(window.app)
  window.fb = getFirestore(window.app)
  window.analytics = getAnalytics(window.app)
  Vue.prototype.$navegando = false
  Vue.prototype.$product = {
    version: '23.12.28.0'
  }

  router.beforeEach((to, from, next) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$navegando = true
      const unsubscribe = auth.onAuthStateChanged(function (user) {
        unsubscribe()
        Vue.prototype.$navegando = false
        console.log(to.path)
        if (!user && (!to.path.startsWith('/auth/') && !(to.path.startsWith('/c/') || to.path === '/'))) {
          next('/auth/login')
        } else if (user) {
          if (to.path === '/' || to.path.startsWith('/auth/')) {
            if (redirect) {
              next(redirect)
            } else {
              next('/home')
            }
          } else {
            next()
          }
        } else {
          next()
        }
        resolve(user)
      }, reject)
    })
  })
})
