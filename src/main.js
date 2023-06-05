import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/index'

import axios from 'axios'

import '@/assets/icon/iconfont.css'

// 全局组件
import Vant from 'vant'
import 'vant/lib/index.css'
import MyScroller from '@/components/Scroller'
import MyLoading from '@/components/Loading'
Vue.use(Vant)
Vue.component('MyScroller', MyScroller)
Vue.component('MyLoading', MyLoading)

Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
