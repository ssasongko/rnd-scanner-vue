export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/Home.vue'),
    meta: {
      pageTitle: 'Dashboard',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/pages/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  }
]