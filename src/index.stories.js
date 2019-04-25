/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
// import { linkTo } from '@storybook/addon-links'

import Portal from './components/Portal.js'
import Wrapper from '../stories/Wrapper.vue'

const stories = storiesOf('Portal', module)
stories.addDecorator(withKnobs)
stories
  .add('default', () => ({
    components: { Portal, Wrapper },
    template: `
    <Wrapper>
      <Portal #default>
        <p>This content was magically moved to the end of the &lt;body&gt;</p>
      </Portal>
    </Wrapper>`,
    methods: { action: action('clicked') },
  }))
  .add('with defined selector', () => ({
    components: { Portal, Wrapper },
    template: `
    <Wrapper #default>
      <Portal selector="#target" #default>
        <p>This content was magically moved to the end of the &lt;body&gt;</p>
      </Portal>
    </Wrapper>`,
    methods: { action: action('clicked') },
  }))
  .add('with "disabled" prop', () => ({
    components: { Portal, Wrapper },
    props: {
      disabled: {
        type: Boolean,
        default: boolean('Disabled', true),
      },
    },
    template: `
    <Wrapper>
      <Portal :disabled="disabled" #default>
        <p>This content <strong>not</strong> be moved to the end of the &lt;body&gt; when the "disabled" prop is set</p>
      </Portal>
    </Wrapper>`,
    methods: { action: action('clicked') },
  }))
