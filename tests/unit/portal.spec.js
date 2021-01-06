import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { appendElToBody } from './utils'
import Portal from '@/components/Portal'
import config from '@/config'
const tick = () => Vue.nextTick()
const getTarget = () => document.querySelector('#' + config.selector)

describe('Basic Features', () => {
  afterEach(() => {
    const el = getTarget()
    el && el.parentNode.removeChild(el)
  })
  it('mounts without any props', async () => {
    mount(Portal, {
      scopedSlots: {
        default() {
          return <div data-test="1">Test</div>
        },
      },
    })

    await tick()

    expect(document.querySelector('[data-test="1"]').textContent).toBe('Test')
  })
  it('mounts with a specified selector props', async () => {
    appendElToBody('test-target')
    mount(Portal, {
      propsData: {
        selector: '#test-target',
      },
      scopedSlots: {
        default() {
          return <div data-test="1">Test</div>
        },
      },
    })

    await tick()

    expect(document.querySelector('[data-test="1"]').textContent).toBe('Test')

    // Manually clean up this one,
    // as all other tests use the default target element
    const el = document.querySelector('#test-target')
    el.parentNode.removeChild(el)
  })

  it('switches location depending on `disabled` prop', async () => {
    const wrapper = mount(Portal, {
      propsData: {
        disabled: true,
      },
      scopedSlots: {
        default() {
          return <div data-test="1">Test</div>
        },
      },
    })

    await tick()

    expect(wrapper.find('[data-test="1"]').text()).toBe('Test')

    wrapper.setProps({
      disabled: false,
    })

    await tick()

    expect(wrapper.find('[data-test="1"]').exists()).toBe(false)
    expect(document.querySelector('[data-test="1"]').textContent).toBe('Test')

    wrapper.setProps({
      disabled: true,
    })

    await tick()
    await tick()

    expect(wrapper.find('[data-test="1"]').exists()).toBe(true)
    expect(document.querySelector('[data-test="1"]')).toBe(null)
  }),
    it('updates when content changes', async () => {
      const Parent = {
        template: `
      <div>
        <portal>
          <p data-test="2">{{msg}}</p>
        </portal>
      </div>
      `,
        data: () => ({
          msg: 'A',
        }),
        components: {
          Portal,
        },
      }
      const parent = mount(Parent)

      await tick()

      expect(document.querySelector('[data-test="2"]').textContent).toBe('A')

      parent.setData({
        msg: 'B',
      })

      await tick()
      await tick()

      expect(document.querySelector('[data-test="2"]').textContent).toBe('B')
    })

  it('adds a wrapper when slot contains more than 1 root node', async () => {
    const Parent = {
      template: `
      <div>
        <portal tag="section">
          <p data-test="2">{{msg}}</p>
          <p data-test="3">{{msg2}}</p>
        </portal>
      </div>
      `,
      data: () => ({
        msg: 'A',
        msg2: 'B',
      }),
      components: {
        Portal,
      },
    }
    mount(Parent)

    await tick()

    expect(document.querySelector('[data-test="2"]').textContent).toBe('A')
    expect(document.querySelector('[data-test="3"]').textContent).toBe('B')
    expect(document.querySelector('[data-test="2"]').parentNode.tagName).toBe(
      'SECTION'
    )
  })

  it('mounts multiple portals to the same target, respecting `prepend`', async () => {
    mount(Portal, {
      scopedSlots: {
        default() {
          return <div data-test="1">Test 1</div>
        },
      },
    })
    mount(Portal, {
      propsData: {
        prepend: true,
      },
      scopedSlots: {
        default() {
          return <div data-test="2">Test 2</div>
        },
      },
    })

    await tick()

    const el1 = document.querySelector('[data-test="1"]')
    const el2 = document.querySelector('[data-test="2"]')
    expect(el1.textContent).toBe('Test 1')
    expect(el2.textContent).toBe('Test 2')
    expect(getTarget().firstChild).toBe(el2)
  })
})
