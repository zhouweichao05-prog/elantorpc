<template>
  <div id="app">
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
