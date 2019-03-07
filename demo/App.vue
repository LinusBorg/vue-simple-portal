<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png" /> <br />
    <button @click="showPortal = !showPortal">Toggle Render</button>
    <button @click="disablePortal = !disablePortal">Toggle disabled</button>
    <portal v-if="showPortal" :disabled="disablePortal">
      <p>Test</p>
      <Test />
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
    disablePortal: false,
  }),
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
</style>
