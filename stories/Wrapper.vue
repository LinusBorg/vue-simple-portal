<template>
  <div class="container">
    <p><i>To see where the content went, scroll down!</i></p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['selector'],
  created: function addMountElement() {
    if (document.querySelector('#target')) return
    const el = document.createElement('DIV')
    el.id = this.selector || 'target'
    const body = document.querySelector('body')
    body.append(el)
  },
}
</script>

<style scoped>
.container {
  max-width: 80vw;
  min-height: 400px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 30px;
}
</style>
