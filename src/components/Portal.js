import Vue from 'vue'
import config from '../config'
import TargetContainer from './TargetContainer'

export default Vue.extend({
  name: 'VuePortal',
  props: {
    append: {
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
    if (!this.getEl()) {
      this.insertContainerEl()
    }
  },
  updated() {
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
    getEl() {
      return document.querySelector(this.selector)
    },
    insertContainerEl() {
      const parent = document.querySelector('body')
      const child = document.createElement(this.tag)
      child.id = this.selector

      if (this.append) {
        parent.firstChild
          ? parent.firstChild.inserBefore(child)
          : parent.append(child)
      } else {
        parent.append(child)
      }
    },
    mount() {
      // console.log('mounting')
      const targetEl = this.getEl()
      const el = document.createElement('DIV')
      targetEl.append(el)
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
      // console.log('unmounting')
      if (this.container) {
        const el = this.container.$el
        this.container.$destroy()
        el.parentNode.removeChild(el)
        delete this.container
      }
    },
  },
})
