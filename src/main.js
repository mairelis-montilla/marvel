import Vue from 'vue'
import App from './App.vue'

import '@/core/plugins/bootstrap'
import '@/core/plugins/directives'
import "@/core/styles/main.styl";

import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
