import Vue from 'vue'
import Portal from './components/Portal'
import config from './config'

function install(_Vue, options = {}) {
  _Vue.component(options.name || 'portal', Portal)
  if (options.defaultSelector) {
    config.selector = options.defaultSelector
  }
}

if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue) {
  // plugin was inlcuded directly in a browser
  Vue.use(install)
}

export default install
export { Portal, config }
