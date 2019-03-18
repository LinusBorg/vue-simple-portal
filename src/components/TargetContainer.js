import Vue from 'vue'
export default Vue.extend({
  // as an abstract component, it doesn't appear in
  // the $parent chain of components.
  // which means the next parent of any component rendered inside of this oen
  // will be the parent from which is was portal'd
  abstract: true,
  name: 'PortalOutlet',
  props: ['nodes', 'tag'],
  data: () => ({
    updatedNodes: this.nodes,
  }),
  render(h) {
    return h(this.tag || 'DIV', this.updatedNodes())
  },
})
