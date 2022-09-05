import { createRouter, createWebHashHistory } from 'vue-router';
import pipeline from '@/middlewares/pipeline'

// autoload routes
const modules = import.meta.globEager('./**/*.js')
const routesList = Object.entries(modules).map(([path, m]) => {
  return m.default
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: routesList
});

// apply middleware
router.beforeEach((to, from, next) => {
  // prepare variable
  const middleware = to.meta.middleware //? to.meta.middleware : [rules.auth];
  const context = {
    to,
    from,
    next,
  }

  /** Navigate to next if middleware is not applied for now */
  if (!to.meta.middleware) {
    return next()
  }

  return middleware[0]({
    ...context,
    next:pipeline(context, middleware,1)
  })
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach((to, from) => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }

  if (to.meta.pageTitle) {
    document.title = `${to.meta.pageTitle} | myDigilearn`
  }
})

export default router;
