import Vue from 'vue'

export function appendElToBody(id, tag = 'div') {
  const body = document.querySelector('body')
  const el = document.createElement(tag)
  el.id = id
  body.append(el)
}

export function genVNodes(n = 1, type = 'DIV', content = 'Test') {
  const vm = new Vue({
    template: '<p></p>',
  })

  const h = vm.$createElement
  const nodes = []
  for (var i = 1; i <= n; i++) {
    nodes.push(h(type, content))
  }
  return () => nodes
}
