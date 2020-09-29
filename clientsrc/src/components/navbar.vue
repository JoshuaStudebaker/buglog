<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-danger">
    <router-link
      class="navbar-brand text-light stave-shadow-big"
      :to="{ name: 'Home' }"
    >
      Merry Scroogemas
      <i class="fas fa-gifts"></i>:
    </router-link>
    <button
      class="navbar-toggler bg-light"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link text-light"
            >Home</router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link text-light" :to="{ name: 'Profile' }"
            >Profile</router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-primary"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-success" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      }
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style>
.scrooge-background {
  background-image: url("../assets/Scrooge-home.jpg");
  background-size: cover;
  background-position: bottom;
}

.see-through {
  background-color: hsla(218, 19%, 89%, 0.8);
}

.stave-shadow-black {
  text-shadow: 0.5px 0.5px 0px black;
}
</style>
