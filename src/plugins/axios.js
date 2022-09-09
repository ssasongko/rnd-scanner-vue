import axios from 'axios'
import vueInit from '@/core/initiate.js'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  // timeout: 1000
})

// request interceptor
axiosIns.interceptors.request.use(
  config => {
    // config.headers = {
    //   ...config.headers,
    //   Authorization: `Bearer ${accessToken}`
    // }

    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// response interceptor
axiosIns.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
);

// set as global variable $http
vueInit.config.globalProperties.$http = axiosIns

export default axiosIns
