# vue-simple-portal

<!-- markdownlint-disable MD024 MD025 MD033 -->

## What this is

`vue-simple-portal` allows you to mount its slot content to the very end of the body element (or potentially any other DOM element on the page) as an immediate child.

Its main use case are components/elements that need to be positioned absolutely relative to the document/viewport, or fixed in some way or another, like:

* modals
* drodowns
* Alerts/notifications
* Toasts

## Usage Example

Minimal example:

```html
<body>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/@linusborg/vue-simple-portal"></script>
  <div id="app">
    <!-- your Vue app mounts to this element -->
  </div>

  <div id="portal-target">
    <!-- our `<portal>` should move stuff here -->
  </div>

  <script>
    new Vue({
      el: '#app',
      template: `
      <div>
        <portal selector="#portal-target">
          <p>This will be mounted as a child element
          of <div id="portal-target"> instead of
          somewhere inside the child tree of <div id="app">
        </portal>
      </div>
      `
    })
  </script>
</body>
```

<!-- TODO: Insert jsfiddle -->

## How this lib relates to `portal-vue`

I'm the author of [portal-vue](https://github.com/LinusBorg/portal-vue), a pretty popular portal library for Vue.js, so the obvious question is:

_Why publish another Portal component?_

Well, `portal-vue` was my first successful library, and I wanted it to be _awesome_, so I packed it full of features to portal _anything_ to _anywhere_, _anytime_ you want.

That turned out pretty well, but also means the library is not exactly *tiny* anymore, and there also were a few issues that I found over time, so I wrote a smaller lib that addresses these issues while slimming down on features and (= bundle size) in order to concentrate on the main use case.

<details>
  <summary>
    Click here if you want to know more
  </summary>

### Drawbacks of `portal-vue`

1. Useless Features: As far as I could tell, people didn't really use most of the features. For most people, this lib solved one problem: Moving stuff to the very end of the `<body>` element so they could properly style and position their modals and similar components. For them, portal-vue comes with a lot of extra pounds that they don't need.
2. The approach that I chose to make the portal-ing work in all the different supported scenarios came with some caveats - the most severe being that it broke the `$parent <-> $children` chain between the host component and the children that were moved. That also means a couple of things that rely on this chain internally don't work as expected, for example:
    * `provide/inject`
    * `<route-view>`

### A solution to these drawbacks

So I experimented a little and came up with this library here, which solves these two things for the majority of users:

1. It only does one thing, and does it well: It moves stuff to the end of the document. And it's much lighter for this reason.
2. It keeps the `$parent <-> $children`chain intact, so most of the existing caveats of `portal-vue` are gone.

### When to use which

* Use `vue-simple-portal` when you want to move stuff to the end of the document only.
* Use `portal-vue` when you want to do more edge-case things, i.e. move stuff around to anywhere *within* your existing app, like the header component area, dynamically move the same content to different places by changing the destination prop etc.

</details>

## Installation

### NPM / Yarn

```bash
npm install -D @linusborg/vue-simple-portal
# or
yarn add -D @linusborg/vue-simple-portal
```

#### Install as a global plugin (Optional)

This will make the `<portal>` component available globally, but also make the portal not lazy-loadable.

```javascript
// main.js
import Vue from 'vue' // requires Vue >= 2.6
import VuePortal from '@linusborg/vue-simple-portal'

Vue.use(VuePortal, {
  name: 'portal', // optional, use to rename component
})
```

#### Or: Import and register it locally

```javascript
// in a component definition
import { Portal } from '@linusborg/vue-simple-portal'
export default {
  name 'MyComponent',
  components: {
    Portal
  }
}
```

### Browser

Just include it with a script tag *after* Vue itself

```html
<head>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-simple-portal"></script>
</head>
```

The plugin will automatically register the `<portal>` component globally.

## Usage Notes

`<portal>` works out of the box without setting any props. By default, it will:

1. Create a randomized id selector (once)
2. Append a `<div>` with that id to the `<body>` (once)
3. Append any `<portal>`'s slot content as a small, transparent component to that `<div>`

Which means the content is now an almost direct decendant of `<body>`, and can safely and reliably be positioned absolutely etc.

So it's even easier than in the Usage Example from above:

```html
<portal>
  <p>This will be mounted as a child element
  of the auto-generated <div> instead of
  somewhere inside the child tree of <div id="app">
</portal>
```

### Customizing the selector

As shown in the initial Usage Example, you can use the `selector` prop to append to an element of your choosing.

If you are tired of specifying the selector over and over again, you can set it as the default selector, overwriting the randomly generated one:

```javascript
Vue.use(VuePortal, {
  selector: '#your-target',
})
```

If you don't want to install the plugin globally, you can use the `setSelector` helper:

```javascript
import { setSelector } from '@linusborg/vue-simple-portal'
setSelector('#your-target')
```

## Props

This library aims to do one thing only, and do it well: move stuff to the end of the document for things like modals. But it still gives the developer a few props to influence how exactly that happens:

### `selector`

|type|required|default|
|------|------|-------|
|String|no    | 'vue-portal-target-&lt;randomId&gt;' |

A query selector that defines the **target element** to which to append the content of the portal.

If no selector is given, a random default selector (created at startup) is used.

If no element matches the selector, a new element is created and appended to `<body>`

Consequently, this means that using the `<portal>` without a `selector` prop will always append to a div at the end of the `<body>` element, which is a sensible default for the goal of this plugin.

### `disabled`

|type|required|default|
|-----|-------|-------|
|Boolean|no   |false  |

When `true`, renders the `<portal>`'s slot content in place instead of appending it to the target element. See Caveats section for a small footgun here.

### `prepend`

|type|required|default|
|-----|-------|-------|
|Boolean|no   | false |

Usually, the slot content of a portal will be *appended* to the target element, which means, if that element has child nodes, our content will be inserted as the last node in that list.

Set the `prepend` prop if you want to *prepend* the content instead.

### `tag`

|type|required|default|
|------|-------|------|
|String|no     |'DIV' |

When the content of `<portal>` is appended to the target element, it's actually wrapped in a small, transparent component (for technical reasons). Like all (*non-functional*) components in Vue, it requires a single root element.

The `tag` prop can be used to define what that element should be.

**Heads up**: When used in combination with `disabled`, it's used to define the root element of the `<portal>` itself!

## Caveats

Some caveats still exist, such as:

### Losing local state when toggling `disabled` prop

When you toggle the `disabled` prop from `true` to `false` or vice versa, any components inside of the portal will be destroyed in their current location and re-created in their new location.

This means all their *local* state is lost.

If you need to keep state between these switches, keep it in a [global state manager](https://vuejs.org/v2/guide/state-management.html)

### Transitions

When you use a `<transition>` as the root element of the portal and then remove the portal (i.e. with `v-if`) or set its `disabled` prop to `true`, no leave transition will happen.

While this is to expected, as the same thing would happen if you removed a div that contains a `<transition>`, it often trips people up, which is why it's mentioned here.

If you need to remove or disable the portal *after* a transition has finished, you can make it work like this:

<details>
  <summary>Show Example</summary>
  
```html
<template>
  <portal :disabled="disablePortal">
    <transition name="fade" appear @afterLeave="disablePortal = true">
      <div v-if="showTransitionContent">
        this will fade in/out
      </div>
    </transition>
  </portal>
</template>
<script>
  export default {
    data: () => ({
      showTransitionContent: true,
      disablePortal: false,
    }),
    methods: {
      getOut() {
        // calling this method will trigger the transition,
        // which when finished, will disable the Portal
        // through the `afterLeave` hook callback
        this.showTransitionContent = false

      }
    }
  }
</script>
```

Of course this only works if you actually can listen to the events of the  `<transition>`, and could be problematic or even impossible with 3rd-Party components, depending on their implementations.

As a last resort you can always use a Timeout if you know the duration of the leave transition.

</details>

### Devtools

If the slot content of the `<portal>` contains components, they will show up as children of the `<portal>` in the devtools, even though their root elements were mounted/moved to the target element, outside of the current component tree.

### Targeting elements inside of your Vue app

The general advice is to only mount to elements *outside* of your Vue app, as that's the prime use case of this library. If you need to mount to locations *inside of* your app, consider using [portal-vue](https://portal-vue.linusb.org) instead.

That being said, you *can* move content to an element that is controlled by Vue, i.e. is part of the template of some other component.

However, be advised that this element could be removed or replaced by Vue when that component re-renders, while the component instances bound to that element (or its children) are still in memory. This could potentialy be a memory leak if you're not careful.

## Development

<details>
  <summary>
  The following commands are useful for anyone forking this project and/or wanting to contribute
  </summary>

### Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lints and fixes files

```bash
yarn run lint
```

### Run the tests

```bash
yarn run test
```

### Run your end-to-end tests

```bash
yarn run test:e2e
```

### Run your unit tests

```bash
yarn run test:unit
```

### Customize configuration

This project is based on Vue CLI, so see [Configuration Reference](https://cli.vuejs.org/config/) of Vue CLI for further details.
</details>
