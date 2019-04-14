<template>
  <div>
    <h1>Basic Use Case</h1>
    <portal selector="#custom-target">
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
