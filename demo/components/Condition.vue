<template>
  <div>
    <h1>Component with condition prop</h1>
    <button id="toggle-button" @click="active = !active">
      Toggle test component
    </button>
    <portal>
      <Test :active="active" />
    </portal>
  </div>
</template>

<script>
import Test from './TestComponentProp'
export default {
  name: 'Base',
  data() {
    return {
      active: false,
    }
  },
  components: {
    Test,
  },
}
</script>

<style lang="scss" scoped></style>
