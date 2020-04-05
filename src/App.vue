<template>
  <div id="wrapper">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`;
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/_reset.scss";
#app {
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
