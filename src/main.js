import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 原来的引用路径
import 'element-ui/lib/theme-chalk/index.css'
// import './element-variables.scss'

// 导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(VueQuillEditor);

// 配置请求的根路径
axios.defaults.baseURL = '/api/'

// 配置axios请求拦截器
axios.interceptors.request.use((config) => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
});
Vue.prototype.$http = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
