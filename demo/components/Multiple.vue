<template>
  <div>
    <h1>Multiple Portals</h1>
    <portal>
      <Test />
    </portal>
    <br />
    <portal prepend>
      <p data-test="multiple-p">Test String from a second portal</p>
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
}
</script>

<style lang="scss" scoped></style>
