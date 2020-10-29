import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
// 原来的引用路径
import 'element-ui/lib/theme-chalk/index.css'
// import './element-variables.scss'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Editor from './components/back/service/Editor'
Vue.component("Editor", Editor)

//导入主题
import './styles/color.less'

// 导入全局样式表
import './assets/css/global.css'

//导入Container组件


Vue.config.productionTip = false
Vue.use(VueQuillEditor);

// 配置请求的根路径
axios.defaults.baseURL = '/api/'

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 配置axios请求拦截器
axios.interceptors.request.use((config) => {
  //Token请求头
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
});
Vue.prototype.$http = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
