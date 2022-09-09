import axios from 'axios'
import vueInit from '@/core/initiate.js'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

vueInit.config.globalProperties.$http = axiosIns

export default axiosIns
