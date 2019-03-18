import Vue from 'vue'
import config from '../config'
import TargetContainer from './TargetContainer'

export default Vue.extend({
  name: 'VuePortal',
  props: {
    prepend: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    selector: {
      type: String,
      default: () => config.selector,
    },
    tag: {
      type: String,
      default: 'DIV',
    },
  },
  render(h) {
    if (this.disabled) {
      return h(this.tag, this.$scopedSlots.default())
    }
    return h()
  },
  created() {
    if (!this.getTargetEl()) {
      this.insertContainerEl()
    }
  },
  updated() {
    // we only update the target container component
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
      return document.querySelector(this.selector)
    },
    insertContainerEl() {
      const parent = document.querySelector('body')
      const child = document.createElement(this.tag)
      child.id = this.selector
      parent.append(child)
    },
    mount() {
      const targetEl = this.getTargetEl()
      const el = document.createElement('DIV')

      if (this.prepend && targetEl.firstChild) {
        targetEl.firstChild.inserBefore(el)
      } else {
        targetEl.append(el)
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
        const el = this.container.$el
        this.container.$destroy()
        el.parentNode.removeChild(el)
        delete this.container
      }
    },
  },
})
