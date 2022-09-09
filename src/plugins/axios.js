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

// request interceptor
vueInit.config.globalProperties.$http.interceptors.request.use(
  config => {
    // config.headers = {
    //   ...config.headers,
    //   Authorization: `Bearer ${accessToken}`
    // }

    return config
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
vueInit.config.globalProperties.$http.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    switch (error.response.status) {
      case 401:
        return Promise.reject(error);
      break;

      default:
        return Promise.reject(error);
      break;
    }
  }
);

export default axiosIns
