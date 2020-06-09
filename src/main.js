import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import axios from 'axios'


Vue.config.productionTip = false



Vue.use(router);
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$axios=axios
axios.defaults.baseURL="http://127.0.0.1:8085";
axios.interceptors.request.use(config=>{
  config.headers.Authorization="Bearer "+store.state.token;
  console.log(config);
  return config
})
