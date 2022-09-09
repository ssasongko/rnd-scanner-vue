import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

const vueInit = createApp(App)

// Connect Vue Router
vueInit.use(router)

// Connect Pinia Router
vueInit.use(store)

// Up we go, Launch the app
vueInit.mount('#app')

export default vueInit
