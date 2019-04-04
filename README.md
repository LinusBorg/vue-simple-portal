# vue-simple-portal

<!-- markdownlint-disable MD025 MD033 -->

## What this is

`vue-simple-portal` allows you to mount its slot content to the very end of the body element (or potentially any other DOM element on he page) as an immediate child.

Its main usecase are components/elements that need to be positioned absolutely relative to the document/viewport, or fixed in some way or another, like:

* modals
* drodowns
* Alerts/notifications
* Toasts

## Usage

Minimal example:

```html
<body>
  <script src="https://unkpg.com/vue/dist/vue.js"></script>
  <script src="https://unkpg.com/vue-simple-portal"></script>
  <div id="app">
    <-- your Vue app mounts to this element -->
  </div>

  <div id="portal-target">
    <!-- our `<portal>` should move stuff here -->
  </div>

  <script>
    new Vue({
      template: `
      <div>
        <portal selector="#portal-target">
          <p>This will be mounted as a child element of <div id="portal-parget"> instead of somehwere inside the child tree of <div id="app">
        </portal>
      <div>
      `
    })
  </script>
</body>
```

TODO: Insert jsfiddle

## How this lib relates to `portal-vue`

I'm the author of [portal-vue](https://github.com/LinusBorg/portal-vue), a pretty popular portal library for Vue.js, so the obvious question is:

_Why publish another Portal component?_

Well, `portal-vue` was my first sucessful library, and I wanted it to be _awesome_, so I packed it full of features to portal _anything_ to _anywhere_, _anytime_ you want.

That' turned out pretty well, but there were two issues that I found over time, so I wrote a smaller lib that adresses these issues while sliming down on features.

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
* Use `portal-vue` when you want to do more edge-case things, i.e. move stuff around to anywhere *within* our existing app, like the header component area, dynamically move the same content to different places by changing the destination prop etc.

</details>

## Installation

### NPM / Yarn

```bash
npm i -g vue-simple-portal
# or
yarn add vue-simple-portal
```

#### Install a a global plugin (Optional)

This will make the `<portal>` component available globally, but also make the portal not lazy-loadable.

```javascript
// main.js
import Vue from 'vue'
import VuePortal from 'vue-simple-portal'

Vue.use(VuePortal, {
  name: 'portal' // optional, use to rename component
})
```

#### Or use and register it locally

```javascript
// in a component definition
import { Portal } from 'vue-simple-portal'
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
  <script src="https://unkpg.com/vue/dist/vue.js"></script>
  <script src="https://unkpg.com/vue-simple-portal"></script>
</head>
```

The plugin will automatically register the `<portal>` component globally.

## Features

This library aims to do one thing only, and do it well: move stuff to the end of the document for things like modals. But it still gives the developer a few props to influence how exactly that happens:

## Caveats

Some caveats still exist, such as:

### Losing local state when toggling `disabled` prop

When you toggle the `disabled` prop from `true` to `false` or vice versa, any components inside of the portal will be destroyed in their current location and re-created in their new location.

This means all their *local* state is lost.

If you need to keep state between these switches, keep it in a [global state manager](https://vuejs.org/v2/guide/state-management.html)

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