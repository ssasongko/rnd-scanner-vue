import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import * as storeList from '@/store/list.js'

const vueInit = createApp(App)

// Connect Vue Router
vueInit.use(router)

// Connect Pinia Router
vueInit.use(store)

// initiate global store data
let stored = {}
// loop through available store
for (const key of Object.keys(storeList)) {
  // register available store
  stored = {
    ...stored,
    [key.replace(/use/, '').toLowerCase()]: storeList[key]()
  }
}
// set global store variable
vueInit.config.globalProperties.$store = stored;


// Up we go, Launch the app
vueInit.mount('#app')

export default vueInit
