<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard {{ name }}</p>
    <p>Your login email is: {{ email }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUser"]),
    name() {
      return !this.getUser ? false : this.getUser.name;
    },
    email() {
      return !this.getUser ? false : this.getUser.email;
    }
  }
};
</script>
