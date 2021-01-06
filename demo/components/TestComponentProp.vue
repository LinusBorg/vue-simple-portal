<template>
  <div v-if="active">
    <h3 data-test="test-header">This is just a Test Component</h3>
    <p>
      Its purpose is to check the behaviour of components inside of the Simple
      Portal which shown by prop
    </p>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  props: ['active'],
}
</script>
