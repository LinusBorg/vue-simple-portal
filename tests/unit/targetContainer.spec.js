import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { genVNodes } from './utils'

import _TC from '@/components/TargetContainer'
// abstract components break test utils
const TC = _TC.extend({ abstract: false })

const tick = () => Vue.nextTick()

describe('TargetContainer', () => {
  it('mounts', async () => {
    const wrapper = mount(TC, {
      propsData: {
        nodes: genVNodes(),
      },
    })
    await tick()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('Test')
  })

  it('updates correctly', async () => {
    const wrapper = mount(TC, {
      propsData: {
        nodes: genVNodes(1),
        tag: 'SECTION',
      },
    })

    await tick()

    expect(wrapper.text()).toBe('Test')
    expect(wrapper.element.childNodes.length).toBe(1)

    wrapper.setData({
      updatedNodes: genVNodes(2),
    })

    await tick()

    expect(wrapper.element.childNodes.length).toBe(2)
  })

  it('skips wrapper element if only one child element is present', () => {
    const wrapper = mount(TC, {
      propsData: {
        nodes: genVNodes(1),
        tag: 'SECTION',
      },
    })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('adds wrapper element if two or more children are present', () => {
    const wrapper = mount(TC, {
      propsData: {
        nodes: genVNodes(2),
        tag: 'SECTION',
      },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it('adds wraspper elements when only text was passed', () => {
    const wrapper = mount(TC, {
      propsData: {
        nodes: () => genVNodes(1)()[0].children[0],
        tag: 'SECTION',
      },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })
})
