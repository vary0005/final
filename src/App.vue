<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>|
      <router-link :to="{ name: 'signup' }">Sign Up</router-link>|
      <router-link :to="{ name: 'signin' }">Sign In</router-link>|
      <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["error"])
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1024px;
  margin: 0 auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.error {
  background-color: rosybrown;
  padding: 20px;
}
</style>
