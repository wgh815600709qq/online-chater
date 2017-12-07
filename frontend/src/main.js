// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {_apiPost, _apiGet, apiPost, apiGet} from './utils/http.js'
import utils from './utils/utils.js'
import lockr from 'lockr'
Vue.config.productionTip = false
Vue.prototype.$_post = _apiPost
Vue.prototype.$post = apiPost
Vue.prototype.$_get = _apiGet
Vue.prototype.$get = apiGet
Vue.prototype.utils = utils
window.lockr = lockr
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
