<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png" /> <br />
    <button @click="toggle">Toggle Render</button>
    <button @click="disablePortal = !disablePortal">Toggle disabled</button>
    <portal v-if="showPortal" :disabled="disablePortal">
      <transition name="fade" appear @afterLeave="finishExit">
        <div v-if="showContent">
          <p>Test</p>
          <Test />
        </div>
      </transition>
    </portal>
    <hr />
  </div>
</template>

<script>
import Test from './components/TestComponent'
export default {
  name: 'App',
  components: {
    Test,
  },
  data: () => ({
    showPortal: true,
    showContent: true,
    disablePortal: false,
  }),
  methods: {
    toggle() {
      if (!this.showPortal) {
        this.showContent = true
        this.showPortal = true
      } else {
        this.showContent = false
      }
    },
    finishExit() {
      console.log('finished!')
      this.showPortal = false
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
