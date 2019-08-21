import Vue from 'vue'
import config, { isBrowser } from '../config'
import TargetContainer from './TargetContainer'

export default Vue.extend({
  name: 'VueSimplePortal',
  props: {
    disabled: {
      type: Boolean,
    },
    prepend: {
      type: Boolean,
    },
    selector: {
      type: String,
      default: () => `#${config.selector}`,
    },
    tag: {
      type: String,
      default: 'DIV',
    },
  },
  render(h) {
    if (this.disabled) {
      const nodes = this.$scopedSlots && this.$scopedSlots.default()
      if (!nodes) return h()
      return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes)
    }
    return h()
  },
  created() {
    if (!this.getTargetEl()) {
      this.insertTargetEl()
    }
  },
  updated() {
    // We only update the target container component
    // if the scoped slot function is a fresh one
    // The new slot syntax (since Vue 2.6) can cache unchanged slot functions
    // and we want to respect that here.
    this.$nextTick(() => {
      if (!this.disabled && this.slotFn !== this.$scopedSlots.default) {
        this.container.updatedNodes = this.$scopedSlots.default
      }
      this.slotFn = this.$scopedSlots.default
    })
  },
  beforeDestroy() {
    this.unmount()
  },
  watch: {
    disabled: {
      immediate: true,
      handler(disabled) {
        disabled ? this.unmount() : this.$nextTick(this.mount)
      },
    },
  },
  methods: {
    // This returns the element into which the content should be mounted.
    getTargetEl() {
      if (!isBrowser) return
      return document.querySelector(this.selector)
    },
    insertTargetEl() {
      if (!isBrowser) return
      const parent = document.querySelector('body')
      const child = document.createElement(this.tag)
      child.id = this.selector.substring(1)
      parent.appendChild(child)
    },
    mount() {
      if (!isBrowser) return
      const targetEl = this.getTargetEl()
      const el = document.createElement('DIV')
      if (this.prepend && targetEl.firstChild) {
        targetEl.insertBefore(el, targetEl.firstChild)
      } else {
        targetEl.appendChild(el)
      }

      this.container = new TargetContainer({
        el,
        parent: this,
        propsData: {
          tag: this.tag,
          nodes: this.$scopedSlots.default,
        },
      })
    },
    unmount() {
      if (this.container) {
        this.container.$destroy()
        delete this.container
      }
    },
  },
})
