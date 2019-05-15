<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  name: "app",
  components: {
    NavigationBar
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function() {}
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

$blue: rgba(36, 123, 160, 1);
$green: rgba(112, 193, 179, 1);
$lightgreen: rgba(178, 219, 191, 1);
$yellow: rgba(243, 255, 189, 1);
$red: rgba(255, 22, 84, 1);

$color1: rgba(1, 22, 39, 1);
$color2: rgba(253, 255, 252, 1);
$color3: rgba(46, 196, 182, 1);
$color4: rgba(231, 29, 54, 1);
$color5: rgba(255, 159, 28, 1);

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: rgb(250, 250, 250);
}

* {
  box-sizing: border-box;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
