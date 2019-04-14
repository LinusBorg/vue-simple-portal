<template>
  <div>
    <h1>Transitions</h1>
    <button @click="toggle = !toggle">Toggle</button>
    <portal>
      <transition name="fade">
        <Test v-if="toggle" />
      </transition>
    </portal>
  </div>
</template>

<script>
import Test from './TestComponent'
export default {
  name: 'Base',
  components: {
    Test,
  },
  data: () => ({
    toggle: false,
  }),
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
