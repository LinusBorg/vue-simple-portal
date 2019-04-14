import Vue from 'vue'
import App from './App.vue'
import SimplePortal from '../src'

Vue.use(SimplePortal)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
