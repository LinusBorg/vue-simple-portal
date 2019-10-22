import Vue from 'vue'
export default Vue.extend({
  // as an abstract component, it doesn't appear in
  // the $parent chain of components.
  // which means the next parent of any component rendered inside of this oen
  // will be the parent from which is was portal'd
  abstract: true,
  name: 'PortalOutlet',
  props: ['nodes', 'tag'],
  data: vm => ({
    updatedNodes: vm.nodes,
  }),
  render(h) {
    const nodes = this.updatedNodes && this.updatedNodes()
    if (!nodes) return h()
    return nodes.length < 2 && !nodes[0].text
      ? h(nodes[0].tag, nodes[0].data, nodes[0].children)
      : h(this.tag || 'DIV', nodes)
  },
  destroyed() {
    const { $el: el } = this
    el.parentNode.removeChild(el)
  },
})
