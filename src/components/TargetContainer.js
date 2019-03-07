import Vue from 'vue'
export default Vue.extend({
  abstract: true,
  name: 'PortalOutlet',
  props: ['nodes', 'tag'],
  data: () => ({
    updatedNodes: null,
  }),
  render(h) {
    return h(
      this.tag || 'DIV',
      this.updatedNodes ? this.updatedNodes() : this.nodes()
    )
  },
})
