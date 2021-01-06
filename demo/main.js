import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import '@babel/polyfill'
import SimplePortal, {
  config as PortalConfig,
} from /*'../src'*/ '../package/dist/index.esm.js'

Vue.use(VueRouter)
Vue.use(SimplePortal)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./components/Base.vue'),
    },
    {
      path: '/disable',
      component: () => import('./components/Disable.vue'),
    },
    {
      path: '/transition',
      component: () => import('./components/Transition.vue'),
    },
    {
      path: '/multiple',
      component: () => import('./components/Multiple.vue'),
    },
    {
      path: '/custom-target',
      component: () => import('./components/CustomTarget.vue'),
    },
  ],
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h =>
    h(App, {
      props: {
        selector: PortalConfig.selector,
      },
    }),
}).$mount('#app')
