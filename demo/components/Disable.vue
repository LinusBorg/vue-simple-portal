<template>
  <div>
    <h1 data-test="disable-h1">Disabled State</h1>
    <portal disabled>
      <Test />
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
