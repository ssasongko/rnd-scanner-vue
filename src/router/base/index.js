import LandingLayout from "@/layouts/landing";

export default [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/landing/index.vue'),
    meta: {
      layout: LandingLayout
    }
  }
]