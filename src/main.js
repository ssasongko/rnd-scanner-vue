import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

const vueInit = createApp(App)

// Global styles
import './global-styles'

// Connect Vue Router
vueInit.use(router)

// Up we go, Launch the app
vueInit.mount('#app')
