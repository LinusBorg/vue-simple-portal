<template>
  <div id="app" :data-selector="selector">
    <h1>Demo App for VueSimplePortal</h1>
    <nav class="nav">
      <router-link to="/" exact>Base</router-link>
      <router-link to="/condition" exact>
        Base With condition component inside portal
      </router-link>
      <router-link to="/disable">Disable</router-link>
      <router-link to="/transition">Transition</router-link>
      <router-link to="/multiple">Multiple</router-link>
      <router-link to="/custom-target">Custom Target</router-link>
    </nav>
    <hr />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: ['selector'],
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 850px;
  min-height: calc(100vh - 400px);
  border-bottom: 1px solid #ccc;
}
.nav {
  margin-bottom: 30px;
}

.nav > a {
  text-decoration: none;
  display: inline-block;
  margin-right: 10px;
}

.router-link-active {
  font-weight: 500;
}
</style>
