const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/c/search', component: () => import('pages/Caronas.vue') },
      { path: '/home', component: () => import('pages/Caronas.vue') }

    ]
  },
  {
    path: '/c',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/c/e/:id', component: () => import('pages/CaronasList.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/AuthLogin.vue') },
      { path: 'password', component: () => import('pages/AuthPassword.vue') },
      { path: 'register', component: () => import('pages/AuthRegister.vue') },
      { path: 'register/email', component: () => import('pages/AuthRegisterEmail.vue') }
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
